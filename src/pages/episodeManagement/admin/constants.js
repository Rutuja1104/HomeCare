export const VISIT_FREQUENCY_OPTIONS = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Thrice a Week", value: "Thrice a Week" },
    { label: "Monthly ", value: "Monthly" },
    { label: "Every Weekday", value: "Every Weekday" },
]

export const MEDICALLY_NECESSARY_DISCIPLINES = [
    {
        title: "Nursing",
        disciplines: [
            {
                label: "Observation and complete organ system assessment, v/s",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Assess patient’s response to new/changed meds/treatments",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Report changes in favorable response to physician",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Teach regarding new medication regimen and side effects",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Teach disease process / disease management",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Pain assessment / management",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Skilled observation of wound site",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Teach symptoms to report nurse, physician, 911",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Teach proper diet / hydration",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Teach safety precaution",
                checked: false,
                selectedVisitFrequency: ""
            }
        ]
    },
    {
        title: "Therapies (PT / OT / ST)",
        disciplines: [
            {
                label: "PT evaluation",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Therapeutic exercise",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Balance / coordination exercise",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Transfer training",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Bed mobility",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Gait training with AD",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Active ROM exercises",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Use ofassistive device",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Home exercise program",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Heat",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Safety awareness",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Pain management",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Massage",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "EMS",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Other",
                checked: false,
                selectedVisitFrequency: ""
            },

        ]
    },
    {
        title: "MSW",
        disciplines: [
            {
                label: "Assess home situation",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Assessment social /emotional factors",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Referral to community programs",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Financial sources information",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "ALF / nursing home placement",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Other",
                checked: false,
                selectedVisitFrequency: ""
            },
        ]
    },
    {
        title: "Aide",
        disciplines: [
            {
                label: "ADL Assistance",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Personal Care Services/Homemaker",
                checked: false,
                selectedVisitFrequency: ""
            },
            {
                label: "Other",
                checked: false,
                selectedVisitFrequency: ""
            },
        ]
    },
]

export const EPISODE_STATUS = [
    { label: "Open", value: "Open" },
    { label: "InProgress", value: "InProgress" },
    { label: "Closed", value: "Closed" },
    { label: "Complete", value: "Complete" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
]

export const EPISODE_LISTING_STATUS = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Inprogress", value: "INPROGRESS" },
]