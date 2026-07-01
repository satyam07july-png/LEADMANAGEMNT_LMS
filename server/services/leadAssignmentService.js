import pool from "../config/db.js";

import ApiError from "../utils/ApiError.js";

import {
  getLeadByIdRepository,
  assignLeadRepository,
} from "../repositories/leadRepository.js";

import {
  getEmployeeByIdRepository,
} from "../repositories/employeeRepository.js";

import {
  createAssignmentHistoryRepository,
} from "../repositories/leadAssignmentRepository.js";

/**
 * =====================================================
 * Assign Lead Service (Production V2)
 * =====================================================
 */
export const assignLeadService = async (
  leadId,
  employeeId,
  assignedBy,
  remarks = null
) => {

  const client = await pool.connect();

  try {

    /* ================================
       Check Lead
    ================================= */
    const lead = await getLeadByIdRepository(leadId);

    if (!lead) {
      throw new ApiError(
        404,
        "Lead not found."
      );
    }

    /* ================================
       Check Employee
    ================================= */
    const employee =
      await getEmployeeByIdRepository(employeeId);

    if (!employee) {
      throw new ApiError(
        404,
        "Counsellor not found."
      );
    }

    /* ================================
       Prevent Duplicate Assignment
    ================================= */
    if (
      Number(lead.assigned_to) === Number(employeeId)
    ) {
      throw new ApiError(
        409,
        "Lead is already assigned to this counsellor."
      );
    }

    await client.query("BEGIN");

    /* ================================
       Update Lead
    ================================= */
    const updatedLead =
      await assignLeadRepository(
        client,
        leadId,
        employeeId
      );

    /* ================================
       Save Assignment History
    ================================= */
    await createAssignmentHistoryRepository(
      client,
      {
        lead_id: leadId,
        assigned_by: assignedBy,
        assigned_to: employeeId,
        previous_assigned_to:
          lead.assigned_to,
        remarks,
      }
    );

    await client.query("COMMIT");

    return updatedLead;

  } catch (error) {

    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();

  }

};