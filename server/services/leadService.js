import pool from "../config/db.js";

import ApiError from "../utils/ApiError.js";
import generateCode from "../utils/generateCode.js";

import {
  LEAD_STATUS,
  LEAD_PRIORITY,
} from "../constants/lead.constants.js";

import {
  createLeadRepository,
  getLeadByIdRepository,
  getAllLeadsRepository,
  getLastLeadRepository,
  findLeadByPhoneRepository,
  findLeadByEmailRepository,
} from "../repositories/leadRepository.js";

import {
  updateLeadRepository,
  softDeleteLeadRepository,
  updateLeadStatusRepository,
} from "../repositories/leadRepository.js";

import {
  assignLeadRepository,
  updateLeadPriorityRepository,
  updateLeadFollowupRepository,
} from "../repositories/leadRepository.js";

import {
  getEmployeeByIdRepository,
} from "../repositories/employeeRepository.js";

import {
  getLeadDashboardRepository,
  getTodayFollowupsRepository,
  getRecentLeadsRepository,
  getLeadStatusAnalyticsRepository,
  getLeadSourceAnalyticsRepository,
  getLeadPriorityAnalyticsRepository,
  getCounsellorPerformanceRepository,
} from "../repositories/leadRepository.js";

/**
 * =====================================================
 * Create Lead Service
 * =====================================================
 */
export const createLeadService = async (leadData) => {
  const client = await pool.connect();

  try {
    const {
      full_name,
      phone,
      email,
      course_id,
      source,
      remarks,
      next_followup_date,
      created_by,
    } = leadData;

    /**
     * -----------------------------------------
     * Duplicate Phone Check
     * -----------------------------------------
     */
    const existingPhone =
      await findLeadByPhoneRepository(phone);

    if (existingPhone) {
      throw new ApiError(
        409,
        "Lead already exists with this phone number."
      );
    }

    /**
     * -----------------------------------------
     * Duplicate Email Check
     * -----------------------------------------
     */
    if (email) {
      const existingEmail =
        await findLeadByEmailRepository(email);

      if (existingEmail) {
        throw new ApiError(
          409,
          "Lead already exists with this email."
        );
      }
    }

    /**
     * -----------------------------------------
     * Generate Lead Code
     * -----------------------------------------
     */
    const lastLead =
      await getLastLeadRepository();

    const leadCode = generateCode(
      "LEAD",
      lastLead?.lead_code
    );

    /**
     * -----------------------------------------
     * Database Transaction
     * -----------------------------------------
     */
    await client.query("BEGIN");

    const lead =
      await createLeadRepository(client, {
        lead_code: leadCode,

        full_name,

        phone,

        email,

        course_id,

        source,

        status: LEAD_STATUS.NEW,

        priority: LEAD_PRIORITY.MEDIUM,

        assigned_to: null,

        remarks,

        next_followup_date:
          next_followup_date || null,

        last_contacted_at: null,

        created_by,
      });

    await client.query("COMMIT");

    return lead;

  } catch (error) {

    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();

  }
};

/**
 * =====================================================
 * Get All Leads
 * =====================================================
 */
export const getAllLeadsService = async (
  filters
) => {

  return await getAllLeadsRepository(
    filters
  );

};

/**
 * =====================================================
 * Get Lead By ID
 * =====================================================
 */
export const getLeadByIdService = async (
  id
) => {

  const lead =
    await getLeadByIdRepository(id);

  if (!lead) {

    throw new ApiError(
      404,
      "Lead not found."
    );

  }

  return lead;

};

/**
 * =====================================================
 * Update Lead Service
 * =====================================================
 */
export const updateLeadService = async (
  id,
  leadData
) => {

  /**
   * -----------------------------------------
   * Get Existing Lead
   * -----------------------------------------
   */
  const existingLead =
    await getLeadByIdRepository(id);

  if (!existingLead) {
    throw new ApiError(
      404,
      "Lead not found."
    );
  }

  /**
   * -----------------------------------------
   * Duplicate Phone Check
   * -----------------------------------------
   */
  if (
    leadData.phone &&
    leadData.phone !== existingLead.phone
  ) {

    const phoneExists =
      await findLeadByPhoneRepository(
        leadData.phone
      );

    if (phoneExists) {
      throw new ApiError(
        409,
        "Phone number already exists."
      );
    }

  }

  /**
   * -----------------------------------------
   * Duplicate Email Check
   * -----------------------------------------
   */
  if (
    leadData.email &&
    leadData.email !== existingLead.email
  ) {

    const emailExists =
      await findLeadByEmailRepository(
        leadData.email
      );

    if (emailExists) {
      throw new ApiError(
        409,
        "Email already exists."
      );
    }

  }

  /**
   * -----------------------------------------
   * Merge Existing + Incoming Data
   * -----------------------------------------
   */
  const updatedLead = {

    full_name:
      leadData.full_name ??
      existingLead.full_name,

    phone:
      leadData.phone ??
      existingLead.phone,

    email:
      leadData.email ??
      existingLead.email,

    course_id:
      leadData.course_id ??
      existingLead.course_id,

    source:
      leadData.source ??
      existingLead.source,

    status:
      leadData.status ??
      existingLead.status,

    priority:
      leadData.priority ??
      existingLead.priority,

    assigned_to:
      leadData.assigned_to ??
      existingLead.assigned_to,

    remarks:
      leadData.remarks ??
      existingLead.remarks,

    next_followup_date:
      leadData.next_followup_date ??
      existingLead.next_followup_date,

    last_contacted_at:
      leadData.last_contacted_at ??
      existingLead.last_contacted_at,

  };

  return await updateLeadRepository(
    id,
    updatedLead
  );

};

/**
 * =====================================================
 * Delete Lead Service
 * =====================================================
 */
export const deleteLeadService = async (
  id
) => {

  const lead =
    await getLeadByIdRepository(id);

  if (!lead) {

    throw new ApiError(
      404,
      "Lead not found."
    );

  }

  return await softDeleteLeadRepository(
    id
  );

};

/**
 * =====================================================
 * Update Lead Status
 * =====================================================
 */
export const updateLeadStatusService = async (
  id,
  status
) => {

  const lead =
    await getLeadByIdRepository(id);

  if (!lead) {

    throw new ApiError(
      404,
      "Lead not found."
    );

  }

  return await updateLeadStatusRepository(
    id,
    status
  );

};

/**
 * =====================================================
 * Assign Lead Service
 * =====================================================
 */
export const assignLeadService = async (
  leadId,
  employeeId
) => {

  const client = await pool.connect();

  try {

    /**
     * ------------------------------
     * Check Lead
     * ------------------------------
     */
    const lead =
      await getLeadByIdRepository(leadId);

    if (!lead) {
      throw new ApiError(
        404,
        "Lead not found."
      );
    }

    /**
     * ------------------------------
     * Check Counsellor
     * ------------------------------
     */
    const employee =
      await getEmployeeByIdRepository(
        employeeId
      );

    if (!employee) {
      throw new ApiError(
        404,
        "Counsellor not found."
      );
    }

    /**
     * ------------------------------
     * Prevent Duplicate Assignment
     * ------------------------------
     */
    if (lead.assigned_to === employeeId) {
      throw new ApiError(
        409,
        "Lead is already assigned to this counsellor."
      );
    }

    await client.query("BEGIN");

    /**
     * Update Lead
     */
    const updatedLead =
      await assignLeadRepository(
        leadId,
        employeeId
      );

    /**
     * Future:
     * Insert into lead_assignments
     * Insert Activity Log
     */

    await client.query("COMMIT");

    return updatedLead;

  } catch (error) {

    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();

  }

};

/**
 * =====================================================
 * Update Lead Priority
 * =====================================================
 */
export const updateLeadPriorityService = async (
  id,
  priority
) => {

  const lead =
    await getLeadByIdRepository(id);

  if (!lead) {

    throw new ApiError(
      404,
      "Lead not found."
    );

  }

  return await updateLeadPriorityRepository(
    id,
    priority
  );

};

/**
 * =====================================================
 * Update Lead Follow-up
 * =====================================================
 */
export const updateLeadFollowupService = async (
  id,
  followupData
) => {

  const lead =
    await getLeadByIdRepository(id);

  if (!lead) {

    throw new ApiError(
      404,
      "Lead not found."
    );

  }

  return await updateLeadFollowupRepository(

    id,

    followupData.next_followup_date,

    followupData.last_contacted_at

  );

};

/**
 * =====================================================
 * Get Dashboard Service
 * =====================================================
 */
export const getDashboardService = async () => {

  const dashboard =
    await getLeadDashboardRepository();

  return dashboard;

};

/**
 * =====================================================
 * Get Today's Followups
 * =====================================================
 */
export const getTodayFollowupsService = async () => {

  return await getTodayFollowupsRepository();

};

/**
 * =====================================================
 * Get Recent Leads
 * =====================================================
 */
export const getRecentLeadsService = async (
  limit = 10
) => {

  return await getRecentLeadsRepository(limit);

};

/**
 * =====================================================
 * Get Lead Analytics
 * =====================================================
 */
export const getLeadAnalyticsService = async () => {

  const [

    status,

    source,

    priority,

    counsellors,

  ] = await Promise.all([

    getLeadStatusAnalyticsRepository(),

    getLeadSourceAnalyticsRepository(),

    getLeadPriorityAnalyticsRepository(),

    getCounsellorPerformanceRepository(),

  ]);

  return {

    status,

    source,

    priority,

    counsellors,

  };

};