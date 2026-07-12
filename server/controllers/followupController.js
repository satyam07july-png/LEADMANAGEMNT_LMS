import {

  createFollowupService,
  updateFollowupService,
  completeFollowupService,
  rescheduleFollowupService,
  deleteFollowupService,

  getLeadFollowupsService,
  getPendingFollowupsService,
  getTodayFollowupsService,
  getOverdueFollowupsService,

  getCompletedFollowupsService,
  getUpcomingFollowupsService,
  getMissedFollowupsService,
  getEmployeeFollowupsService,
  getFollowupStatisticsService,

} from "../services/followupService.js";



/**
 * =====================================================
 * Create Follow-up
 * =====================================================
 */

export const createFollowup = async (
    req,
    res,
    next
) => {

    try {

        const followup = await createFollowupService({

            ...req.body,

            created_by: req.user.id,

        });

        return res.status(201).json({

            success: true,

            message: "Follow-up created successfully.",

            data: followup,

        });

    } catch (error) {

        next(error);

    }

};

/**
 * =====================================================
 * Lead Follow-up History
 * =====================================================
 */

export const getLeadFollowups = async (
    req,
    res,
    next
) => {

    try {

        const { leadId } = req.params;

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const data =
            await getLeadFollowupsService(

                leadId,

                page,

                limit

            );

        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        next(error);

    }

};

/**
 * =====================================================
 * Pending Follow-ups
 * =====================================================
 */

export const getPendingFollowups = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await getPendingFollowupsService(
                req.user.employee_id
            );

        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        next(error);

    }

};

/**
 * =====================================================
 * Today's Follow-ups
 * =====================================================
 */

export const getTodayFollowups = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await getTodayFollowupsService(
                req.user.employee_id
            );

        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        next(error);

    }

};

/**
 * =====================================================
 * Overdue Follow-ups
 * =====================================================
 */

export const getOverdueFollowups = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await getOverdueFollowupsService(
                req.user.employee_id
            );

        return res.status(200).json({

            success: true,

            data,

        });

    } catch (error) {

        next(error);

    }

};

export const updateFollowup = async (
    req,
    res,
    next
) => {

    try {

        const data =
            await updateFollowupService(

                req.params.id,

                {

                    ...req.body,

                    updated_by: req.user.id,

                }

            );

        return res.status(200).json({

            success: true,

            message: "Follow-up updated successfully.",

            data,

        });

    } catch (error) {

        next(error);

    }

};

export const completeFollowup = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await completeFollowupService(

        req.params.id,

        req.user.id,

        req.body.outcome,

        req.body.remarks

      );

    res.status(200).json({

      success: true,

      message: "Follow-up completed successfully.",

      data,

    });

  } catch (error) {

    next(error);

  }

};

export const rescheduleFollowup = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await rescheduleFollowupService(

        req.params.id,

        req.body.next_followup_at,

        req.body.remarks,

        req.user.id

      );

    res.status(200).json({

      success: true,

      message: "Follow-up rescheduled successfully.",

      data,

    });

  } catch (error) {

    next(error);

  }

}

export const deleteFollowup = async (
  req,
  res,
  next
) => {

  try {

    await deleteFollowupService(

      req.params.id,

      req.user.id

    );

    res.status(200).json({

      success: true,

      message: "Follow-up deleted successfully."

    });

  } catch (error) {

    next(error);

  }

};


export const getCompletedFollowups = async (
  req,
  res,
  next
) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 20;

    const data =
      await getCompletedFollowupsService(

        req.user.employee_id,

        page,

        limit

      );

    return res.status(200).json({

      success: true,

      data,

    });

  } catch (error) {

    next(error);

  }

};

export const getUpcomingFollowups = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await getUpcomingFollowupsService(
        req.user.employee_id
      );

    return res.status(200).json({

      success: true,

      data,

    });

  } catch (error) {

    next(error);

  }

};

export const getMissedFollowups = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await getMissedFollowupsService(
        req.user.employee_id
      );

    return res.status(200).json({

      success: true,

      data,

    });

  } catch (error) {

    next(error);

  }

};

export const getEmployeeFollowups = async (
  req,
  res,
  next
) => {

  try {

    const { employeeId } = req.params;

    const data =
      await getEmployeeFollowupsService(
        employeeId
      );

    return res.status(200).json({

      success: true,

      data,

    });

  } catch (error) {

    next(error);

  }

};

export const getFollowupStatistics = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await getFollowupStatisticsService();

    return res.status(200).json({

      success: true,

      data,

    });

  } catch (error) {

    next(error);

  }

};