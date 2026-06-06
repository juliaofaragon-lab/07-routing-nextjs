'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { createNote } from '@/lib/api/notes';
import type { CreateNoteData, NoteTag } from '@/types/note';

import css from './NoteForm.module.css';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
const initialValues: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS).required('Tag is required'),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik<CreateNoteData>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" className={css.input} type="text" name="title" />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              className={css.textarea}
              name="content"
              rows={8}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" className={css.select} name="tag">
              {TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          {mutation.isError && (
            <p className={css.error}>Could not create the note.</p>
          )}

          <div className={css.actions}>
            <button
              className={css.cancelButton}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={css.submitButton}
              type="submit"
              disabled={mutation.isPending || !dirty || !isValid}
            >
              {mutation.isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
