/**
 * Div, styled according to completion status. 
 * Brings up a modal containing the actual habit interactive completion entry.
 */
const EntryBox = ({ completionEntry }) => {
    const base = "EntryBox";
    
    function handleClick() {
        // bring up a CompletionInstance belonging to completionEntry 
        return;
    }

    return (
        <div 
            className={`${base}`}
            onClick={handleClick}
        />
    )
}

export default EntryBox