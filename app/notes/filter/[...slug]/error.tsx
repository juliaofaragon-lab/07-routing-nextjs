'use client';

interface FilteredNotesErrorProps {
  error: Error;
  reset: () => void;
}

export default function FilteredNotesError({
  error,
  reset,
}: FilteredNotesErrorProps) {
  const isMissingToken = error.message.includes('NEXT_PUBLIC_NOTEHUB_TOKEN');

  return (
    <div>
      <p>
        {isMissingToken
          ? 'NoteHub API token is not configured.'
          : 'Could not fetch the list of notes.'}
      </p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
