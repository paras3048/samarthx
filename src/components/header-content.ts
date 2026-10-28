type HeaderEntry = [title: string, description: string];

export const PLATFORM_GROUPS: { title: string; items: HeaderEntry[] }[] = [
  { title: "Platform", items: [
    ["Platform Overview", "See how the connected platform is organised."],
    ["State Education Governance", "Support state-level oversight, organisational hierarchy, and coordinated administration across the school education system."],
    ["School Management", "Enable institutional administration, academic operations, and day-to-day school workflows on a shared platform."],
    ["Employee & Teacher Management", "Manage employee and teacher records, roles, attendance, and related service workflows."],
    ["Student Lifecycle Management", "Support student journeys from admission through academic progression and related institutional records."],
    ["Parent Services", "Provide parents and guardians with relevant updates and services connected to their child’s schooling."],
    ["Data & Analytics", "Turn operational education data into decision-ready insights for administrators and policymakers."],
    ["Integrations & Interoperability", "Connect existing systems and enable consistent, controlled exchange of education data where supported."],
  ] },
  { title: "Governance", items: [
    ["School Registry", "One verified record for every school"],
    ["UDISE+ Sync", "Keep state and national data in step"],
    ["Compliance Desk", "Track inspections, approvals, and gaps"],
    ["State Dashboard", "Live view across every district"],
  ] },
  { title: "Admissions", items: [
    ["Online Admissions", "Run the full admission cycle online"],
    ["Seat Matrix", "Allocate seats by category and stream"],
    ["Fee Waivers", "Automate eligibility and approvals"],
    ["Document Vault", "Verify every record in one place"],
  ] },
  { title: "People", items: [
    ["Staff Records", "One profile for every employee"],
    ["Payroll & Service", "Salary, increments, and service books"],
    ["Transfers & Postings", "Move staff without the paperwork"],
  ] },
  { title: "Academics", items: [
    ["Student Records", "Attendance, marks, and progress"],
    ["Timetable", "Build and publish class schedules"],
    ["Assessments", "Record exams and publish results"],
    ["Certificates", "Issue verifiable documents"],
    ["Reports", "Board-ready district analytics"],
    ["Integrations", "Connect UDISE+ and treasury"],
  ] },
];

export const SOLUTIONS: HeaderEntry[] = [
  ["For State Governments", "Adopt a state-first digital platform that connects education governance from the department to schools and people."],
  ["For Education Departments", "Administer policy, planning, and operational oversight through connected institutional data."],
  ["For District Administrations", "Manage district-level coordination, monitoring, and support for schools within a shared state system."],
  ["For Schools", "Run institutional administration and academic operations as part of a connected education ecosystem."],
  ["For Teachers & Employees", "Access role-based services for employment, attendance, and related institutional workflows."],
  ["For Students", "Support student records and academic journeys within a coherent institutional system."],
  ["For Parents", "Stay connected to schooling through parent-facing services linked to institutional records."],
];