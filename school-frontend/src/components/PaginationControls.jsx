import "./PaginationControls.css";

function PaginationControls({ pagination, onPrevious, onNext }) {
  if (!pagination) return null;

  return (
    <div className="pagination-controls">
      <button onClick={onPrevious} disabled={!pagination.hasPrevious}>
        Previous
      </button>
      <button onClick={onNext} disabled={!pagination.hasNext}>
        Next
      </button>
    </div>
  );
}

export default PaginationControls;