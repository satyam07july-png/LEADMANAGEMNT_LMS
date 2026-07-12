import asyncHandler from "../utils/asyncHandler.js";

import {
  assignLeadService,
} from "../services/leadAssignmentService.js";


import {
  getLeadAssignmentHistoryService,
} from "../services/leadAssignmentService.js";

import {
  reassignLeadService,
} from "../services/leadAssignmentService.js";

/**
 * =====================================================
 * Assign Lead
 * POST /api/leads/:leadId/assign
 * =====================================================
 */

export const assignLead = asyncHandler(
  async (req, res) => {

    const { leadId } = req.params;

    const {
      employee_id,
      remarks,
    } = req.body;

    const assignedBy = req.user.id;

    const data =
      await assignLeadService(
        leadId,
        employee_id,
        assignedBy,
        remarks
      );

    return res.status(200).json({

      success: true,

      message:
        "Lead assigned successfully.",

      data,

    });

  }
);

export const getLeadAssignmentHistory =
async (req, res, next) => {

  try {

    const { leadId } = req.params;

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 20;

    const data =
      await getLeadAssignmentHistoryService(
        leadId,
        page,
        limit
      );

    return res.status(200).json({

      success: true,

      message:
        "Assignment history fetched successfully.",

      data,

    });

  } catch (error) {

    next(error);

  }

};

export const reassignLead = async (
  req,
  res,
  next
) => {

  try {

    const { leadId } = req.params;

    const {
      employee_id,
      remarks,
    } = req.body;

    const data =
      await reassignLeadService(
        leadId,
        employee_id,
        req.user.id,
        remarks
      );

    return res.status(200).json({

      success: true,

      message:
        "Lead reassigned successfully.",

      data,

    });

  } catch (error) {

    next(error);

  }

};

