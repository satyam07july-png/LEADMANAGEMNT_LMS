import "./SearchFilterBar.css";
import {
    Search,
    RotateCcw
} from "lucide-react";

const SearchFilterBar = () => {

    return (

        <div className="search-filter-bar">

            <div className="search-box">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search by name, mobile or email..."
                />

            </div>

            <select>
                <option>All Status</option>
                <option>New</option>
                <option>Hot</option>
                <option>Warm</option>
                <option>Cold</option>
                <option>Converted</option>
            </select>

            <select>
                <option>All Courses</option>
            </select>

            <select>
                <option>Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>

            <button className="reset-filter-btn">

                <RotateCcw size={18} />

                Reset

            </button>

        </div>

    );

};

export default SearchFilterBar;