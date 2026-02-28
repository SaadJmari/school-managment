function PaginationControls({pagination, onPrevious, onNext}) {
    if(!pagination) return null;

    return (
        <div style= {{marginTop: 16, display:"flex", gap: 8, alignItems: "center"}}>
            <button onClick={onPrevious} disabled={!pagination.hasPrevious}>Previous</button>
            <button onClick={onNext} disabled={!pagination.hasNext}>Next</button>
        </div>
    )
}

export default PaginationControls