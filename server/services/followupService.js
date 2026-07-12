import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

import {
  findLeadByIdRepository,
} from "../repositories/leadRepository.js";

import {
  findEmployeeByIdRepository,
} from "../repositories/employeeRepository.js";

import {
  createFollowupRepository,
  findFollowupByIdRepository,
  updateFollowupRepository,
  completeFollowupRepository,
  rescheduleFollowupRepository,
  deleteFollowupRepository,
  getLeadFollowupsRepository,
  getPendingFollowupsRepository,
  getTodayFollowupsRepository,
  getOverdueFollowupsRepository,
  
} from "../repositories/followupRepository.js";

import {

  getCompletedFollowupsRepository,

  getUpcomingFollowupsRepository,

  getMissedFollowupsRepository,

  getEmployeeFollowupsRepository,

  getFollowupStatisticsRepository,

} from "../repositories/followupRepository.js";

/**
 * =====================================================
 * Create Follow-up
 * =====================================================
 */

export const createFollowupService = async (
    followupData
) => {

    const client = await pool.connect();

    try {

        const lead =
            await findLeadByIdRepository(
                followupData.lead_id
            );

        if (!lead) {

            throw new ApiError(
                404,
                "Lead not found."
            );

        }

        const employee =
            await findEmployeeByIdRepository(
                followupData.employee_id
            );

        if (!employee) {

            throw new ApiError(
                404,
                "Employee not found."
            );

        }

        await client.query("BEGIN");

        const followup =
            await createFollowupRepository(
                client,
                followupData
            );

        await client.query("COMMIT");

        return followup;

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }

};

export const getLeadFollowupsService = async (

    leadId,

    page = 1,

    limit = 20

) => {

    return await getLeadFollowupsRepository(

        leadId,

        page,

        limit

    );

};

export const getPendingFollowupsService = async (

    employeeId

) => {

    return await getPendingFollowupsRepository(

        employeeId

    );

};

export const getTodayFollowupsService = async (

    employeeId

) => {

    return await getTodayFollowupsRepository(

        employeeId

    );

};

export const getOverdueFollowupsService = async (

    employeeId

) => {

    return await getOverdueFollowupsRepository(

        employeeId

    );

};

export const updateFollowupService = async (
    id,
    followupData
) => {

    const client = await pool.connect();

    try {

        const followup =
            await findFollowupByIdRepository(id);

        if (!followup) {

            throw new ApiError(
                404,
                "Follow-up not found."
            );

        }

        await client.query("BEGIN");

        const updated =
            await updateFollowupRepository(

                client,

                id,

                followupData

            );

        await client.query("COMMIT");

        return updated;

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }

};

export const completeFollowupService = async (
  id,
  completedBy,
  outcome,
  remarks
) => {

  const client = await pool.connect();

  try {

    const followup = await findFollowupByIdRepository(id);

    if (!followup) {
      throw new ApiError(
        404,
        "Follow-up not found."
      );
    }

    await client.query("BEGIN");

    const completed =
      await completeFollowupRepository(
        client,
        id,
        completedBy,
        outcome,
        remarks
      );

    await client.query("COMMIT");

    return completed;

  } catch (error) {

    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();

  }

};

export const rescheduleFollowupService = async (
  id,
  nextFollowupAt,
  remarks,
  updatedBy
) => {

  const client = await pool.connect();

  try {

    const followup = await findFollowupByIdRepository(id);

    if (!followup) {
      throw new ApiError(
        404,
        "Follow-up not found."
      );
    }

    await client.query("BEGIN");

    const updated =
      await rescheduleFollowupRepository(
        client,
        id,
        nextFollowupAt,
        remarks,
        updatedBy
      );

    await client.query("COMMIT");

    return updated;

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

};

export const deleteFollowupService = async (
  id,
  updatedBy
) => {

  const client = await pool.connect();

  try {

    const followup = await findFollowupByIdRepository(id);

    if (!followup) {
      throw new ApiError(
        404,
        "Follow-up not found."
      );
    }

    await client.query("BEGIN");

    const deleted =
      await deleteFollowupRepository(
        client,
        id,
        updatedBy
      );

    await client.query("COMMIT");

    return deleted;

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

};

export const getCompletedFollowupsService =
async (employeeId,page,limit)=>
await getCompletedFollowupsRepository(
employeeId,page,limit);

export const getUpcomingFollowupsService =
async (employeeId)=>
await getUpcomingFollowupsRepository(
employeeId);

export const getMissedFollowupsService =
async (employeeId)=>
await getMissedFollowupsRepository(
employeeId);

export const getEmployeeFollowupsService =
async (employeeId)=>
await getEmployeeFollowupsRepository(
employeeId);

export const getFollowupStatisticsService =
async ()=>
await getFollowupStatisticsRepository();