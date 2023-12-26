import React from 'react';

function Pagination({ currentPage, totalPages, onNext, onPrevious }) {
    return (
        <div>
            <button onClick={onPrevious} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
        Page {currentPage} of {totalPages}
      </span>
            <button onClick={onNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}

export default Pagination;
