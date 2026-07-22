import { ChevronLeft, ChevronRight } from "lucide-react";

const CampaignPagination = ({
  page,
  totalPages,
  totalRecords,
  limit,
  onPageChange,
}) => {

  const start =
    totalRecords === 0
      ? 0
      : (page - 1) * limit + 1;

  const end = Math.min(
    page * limit,
    totalRecords
  );

  return (

    <div className="campaign-pagination">

      <div className="pagination-info">

        Showing

        <strong>

          {" "}

          {start}-{end}

        </strong>

        of

        <strong>

          {" "}

          {totalRecords}

        </strong>

        Campaigns

      </div>

      <div className="pagination-actions">

        <button

          disabled={page === 1}

          onClick={() =>
            onPageChange(page - 1)
          }

        >

          <ChevronLeft size={18} />

          Previous

        </button>

        <span>

          Page

          <strong>

            {" "}

            {page}

          </strong>

          {" "}

          of

          <strong>

            {" "}

            {totalPages}

          </strong>

        </span>

        <button

          disabled={page === totalPages}

          onClick={() =>
            onPageChange(page + 1)
          }

        >

          Next

          <ChevronRight size={18} />

        </button>

      </div>

    </div>

  );

};

export default CampaignPagination;