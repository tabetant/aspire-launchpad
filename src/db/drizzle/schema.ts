import { serial, pgTable, text, pgEnum, date, timestamp } from 'drizzle-orm/pg-core'


export const statusEnum = pgEnum('status', ['applied', 'interview', 'offer', 'rejected']);

export const applications = pgTable('applications', {
    id: serial('id').primaryKey(),
    title: text('title').default('').notNull(),
    company: text('company').default('').notNull(),
    status: statusEnum('status').notNull(),
    dateApplied: date('date_applied').notNull().defaultNow(),
    notes: text('notes').default('now'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    resumeUrl: text('resume_url'),
})