import "./SummaryCard.css";

const SummaryCard = ({
    title,
    value,
    icon,
    color,
}) => {

    return (

        <div className="summary-card">

            <div className="summary-card-top">

                <div>

                    <span className="summary-title">

                        {title}

                    </span>

                    <h2 className="summary-value">

                        {value}

                    </h2>

                </div>

                <div className={`summary-icon ${color}`}>

                    {icon}

                </div>

            </div>

        </div>

    );

};

export default SummaryCard;