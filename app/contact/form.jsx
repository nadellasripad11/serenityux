'use client';

import { useEffect, useState } from 'react';

import { ArrowUpRight, Check, Loader2 } from 'lucide-react';

import { MagneticButton } from '@/components';

const EMAIL = 'nadellasripad11@gmail.com';
const DAILY_LIMIT = 3;
const STORAGE_KEY = 'contact-submissions';

const projectTypes = [
  'Unpaid internship',
  'Collaboration',
  'Coffee chat',
  'Something else',
];

/**
 * Starter templates for each project type. All lowercase to match the
 * site's voice. Parenthetical placeholders like (your name) are hints for
 * the sender to fill in. Only auto-fills on explicit type-pill click when
 * the message is either empty or still matches one of these templates, so
 * personalized text is never overwritten.
 */
const templates = {
  'Unpaid internship': `hi sripad,

i'm (your name) with (school / organization / team). we're looking for someone to help with (what you'd want me to do) as an unpaid intern for about (timeframe).

- what we're working on: (short pitch)
- what i'd learn: (skills / exposure)
- when: (start date + how long)

(link to more info if you have one)

thanks!`,
  Collaboration: `hey sripad,

i'm working on (short pitch of what you're building) and think you could be a good fit to help with (what you want help with).

- what it is: (one-liner)
- what stage: (idea / prototype / launched)
- what i'm looking for: (design / code / feedback / something else)

open to a quick call?`,
  'Coffee chat': `hey sripad,

would love to chat about (topic - ai, product, school, etc). i'm (a student / builder / etc) working on (short thing about you or what brought you to my site).

got 15 min this week?`,
  'Something else': '',
};

const templateValues = Object.values(templates);

/** Timestamps from the last 24h, read from localStorage. */
function getRecentSubmissions() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    return Array.isArray(stored) ? stored.filter(ts => ts > dayAgo) : [];
  } catch {
    return [];
  }
}

function recordSubmission() {
  const recent = getRecentSubmissions();
  recent.push(Date.now());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
}

const fieldClass =
  'w-full border-0 border-b border-solid border-muted-foreground bg-transparent pb-4 pt-2 text-2xl outline-none placeholder:text-muted-foreground/60 focus:border-foreground lg:text-3xl disabled:opacity-50';

const labelClass =
  'text-xs uppercase tracking-[0.2em] text-secondary-foreground';

/** @typedef {'idle' | 'submitting' | 'success' | 'error'} Status */

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState(projectTypes[0]);
  const [message, setMessage] = useState('');
  /** @type {[Status, Function]} */
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [submissionsToday, setSubmissionsToday] = useState(0);

  useEffect(() => {
    setSubmissionsToday(getRecentSubmissions().length);
  }, []);

  const limitReached = submissionsToday >= DAILY_LIMIT;

  /**
   * Swap the type pill and, if the message is either empty or a
   * still-unedited template, replace it with the template for the new
   * type. If the sender has typed anything of their own, leave it alone.
   */
  function handleTypeChange(newType) {
    setType(newType);
    const canOverwrite = message === '' || templateValues.includes(message);
    if (canOverwrite) setMessage(templates[newType] ?? '');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (getRecentSubmissions().length >= DAILY_LIMIT) {
      setSubmissionsToday(DAILY_LIMIT);
      setStatus('error');
      setError("You've hit today's limit of 3 messages. You can't spam this - try again tomorrow.");
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, type, message }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Try again.');
      }

      recordSubmission();
      setSubmissionsToday(getRecentSubmissions().length);
      setStatus('success');
      setName('');
      setEmail('');
      setType(projectTypes[0]);
      setMessage('');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className='flex min-h-[24rem] flex-col items-center justify-center gap-4 rounded-2xl border border-solid text-center'>
        <Check size={40} strokeWidth={1.25} />
        <p className='text-2xl lg:text-3xl'>Message sent.</p>
        <p className='max-w-sm text-muted-foreground'>
          Thanks for reaching out - I&apos;ll reply from{' '}
          {EMAIL} as soon as I can.
        </p>
        {submissionsToday < DAILY_LIMIT ? (
          <button
            type='button'
            onClick={() => setStatus('idle')}
            className='mt-2 text-sm underline underline-offset-4'
          >
            Send another message
          </button>
        ) : (
          <p className='mt-2 text-sm text-secondary-foreground'>
            That was your last message for today.
          </p>
        )}
      </div>
    );
  }

  const submitting = status === 'submitting';

  if (limitReached && status !== 'submitting') {
    return (
      <div className='flex min-h-[24rem] flex-col items-center justify-center gap-4 rounded-2xl border border-solid text-center'>
        <p className='text-2xl lg:text-3xl'>You can&apos;t spam this.</p>
        <p className='max-w-sm text-muted-foreground'>
          You&apos;ve sent {DAILY_LIMIT} messages today. Try again tomorrow,
          or email me directly at{' '}
          <a href={`mailto:${EMAIL}`} className='underline underline-offset-4'>
            {EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='grid gap-14'>
      <div>
        <label htmlFor='contact-name' className={labelClass}>
          01 / What&apos;s your name?
        </label>
        <input
          id='contact-name'
          type='text'
          required
          maxLength={200}
          disabled={submitting}
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder='Jane Doe'
          className={fieldClass}
          autoComplete='name'
        />
      </div>

      <div>
        <label htmlFor='contact-email' className={labelClass}>
          02 / What&apos;s your email?
        </label>
        <input
          id='contact-email'
          type='email'
          required
          maxLength={200}
          disabled={submitting}
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='jane@example.com'
          className={fieldClass}
          autoComplete='email'
        />
      </div>

      <div>
        <p className={labelClass}>03 / What&apos;s this about?</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          {projectTypes.map(option => {
            const active = option === type;
            return (
              <button
                key={option}
                type='button'
                disabled={submitting}
                onClick={() => handleTypeChange(option)}
                className={
                  'rounded-full border border-solid px-5 py-3 text-sm transition-colors duration-200 disabled:opacity-50 ' +
                  (active
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-muted-foreground text-secondary-foreground hover:border-foreground hover:text-foreground')
                }
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor='contact-message' className={labelClass}>
          04 / Tell me more
        </label>
        <textarea
          id='contact-message'
          required
          maxLength={5000}
          disabled={submitting}
          rows={10}
          value={message}
          onChange={event => setMessage(event.target.value)}
          placeholder="A short pitch, a link, or just what you're thinking about. Pick a topic above to load a starter template."
          className={fieldClass + ' resize-y'}
        />
      </div>

      <div className='flex flex-wrap items-center justify-between gap-6 pt-4'>
        <p className='max-w-md text-sm text-secondary-foreground'>
          {status === 'error' ? (
            <span className='text-destructive'>{error}</span>
          ) : (
            <>
              This sends straight to my inbox - no email client popup, just a
              direct message.
            </>
          )}
        </p>
        <MagneticButton
          type='submit'
          variant='primary'
          size='lg'
          disabled={submitting}
          className='px-10 py-8 text-base disabled:opacity-70'
        >
          <span className='flex items-center gap-3'>
            {submitting ? (
              <>
                Sending
                <Loader2 size={20} strokeWidth={1.5} className='animate-spin' />
              </>
            ) : (
              <>
                Send message
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </>
            )}
          </span>
        </MagneticButton>
      </div>
    </form>
  );
}
