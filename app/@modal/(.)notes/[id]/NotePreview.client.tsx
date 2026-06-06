'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/notes';

import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const closeModal = useCallback(() => router.back(), [router]);
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <button className={css.backBtn} type="button" onClick={closeModal}>
          Close
        </button>

        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Could not fetch note details.</p>}
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
