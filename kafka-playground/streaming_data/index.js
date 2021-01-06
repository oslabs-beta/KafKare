/* eslint-disable */
const fetch = require('node-fetch');
const { runProducer } = require('./producer');

let url = 'https://data.cityofnewyork.us/resource/kpav-sd4t.json';

let settings = { method: 'Get' };

const getJobData = () => {
  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      console.log('whats json', json);
      for (let i = 0; i < json.length; i++) {
        console.log(json[i].job_category, json[i].salary_range_from);
        // create topic based on job category
        // settimeout to simulate a streaming environment
        // produce the data to consumer based on topic: if the job_category is , we will send salary_range_from:salary_range_to: to salary_range topic,
        // and job_description to job description topic and  preferred_skills: to skill topic

        // const data = [
        //   {
        //     topic: 'salary_range',
        //     messages: [
        //       {
        //         value: `${i.salary_range_from}-${i.salary_range_to}`,
        //       },
        //     ],
        //   },
        //   {
        //     topic: 'job_description',
        //     messages: [{ value: i.job_description }],
        //   },
        //   {
        //     topic: 'skills',
        //     messages: [
        //       {
        //         value: i.preferred_skills,
        //       },
        //     ],
        //   },
        // ];
        setTimeout(() => {
          const data = [
            {
              salary: `${json[i].job_id}: ${json[i].salary_range_from}-${json[i].salary_range_to}`,
            },
          ];
          console.log(data);
          runProducer('jobs', JSON.stringify(data));
        }, i * 1000);
      }
    });
};
getJobData();
/*{
    job_id: '416232',
    agency: 'DEPT OF HEALTH/MENTAL HYGIENE',
    posting_type: 'Internal',
    number_of_positions: '2',
    business_title: 'Principal Administrative Associate, Bureau of Environmental Disease and Injury Prevention/Healthy Homes Program',
    civil_service_title: 'PRINCIPAL ADMINISTRATIVE ASSOC',
    title_classification: 'Competitive-1',
    title_code_no: '10124',
    level: '02',
    job_category: 'Administration & Human Resources Health',
    full_time_part_time_indicator: 'F',
    career_level: 'Experienced (non-manager)',
    salary_range_from: '49390',
    salary_range_to: '61341.84',
    salary_frequency: 'Annual',
    work_location: '125 Worth Street, Nyc',
    division_work_unit: 'Healthy Homes Progam',
    job_description: '**OPEN TO PERMANENT PRINCIPAL ADMINISTRATIVE ASSOCIATES ONLY. YOU MUST CLEARLY STATE YOUR CIVIL SERVICE STATUS ON YOUR RESUME OR COVER LETTER. FAILURE TO DO SO WILL RESULT IN YOUR DISQUALIFICATION.  The mission of the Bureau of Environmental Disease and Injury Prevention is to prevent environmental disease and injury in homes, communities and the workplace, and to protect health by promoting healthy environments and health equity.  The Bureau is comprised of four Programs - Healthy Homes, Environmental Health Assessment and Communications, Poison Control Center, and Injury and Violence Prevention.   DUTIES WILL INCLUDE BUT NOT BE LIMITED TO:   â¢\tSupervise unit staff as assigned in new job procedures, program rules, policies and procedures.  â¢\tAnswer telephone calls and correspondence requests from public and other agencies.  â¢\tMaintain records/datasets to document hotline associated activities.  â¢\tPrepare educational materials for distribution or mailing.  â¢\tProvide owners/agents with the necessary information needed to comply with Commissionerâs Order to abate/remediate.  â¢\tReview work of staff and take corrective action to maintain proficiency.  â¢\tMaintain all patient/medical documents in a confidential manner.  â¢\tPerform other required duties as assigned.',
    minimum_qual_requirements: "1. A baccalaureate degree from an accredited college and three years of satisfactory full-time progressively responsible  clerical/administrative  experience, one year of which must have been in an administrative capacity or supervising staff performing  clerical/administrative  work of more than moderate difficulty;  or  2. An associate degree or 60 semester credits from an accredited college and four years of satisfactory full-time progressively responsible  clerical/administrative  experience including one year of the administrative supervisory experience described in  1  above;  or  3. A four-year high school diploma or its educational equivalent approved by a State's department of education or a recognized accrediting organization and five years of satisfactory full-time progressively responsible  clerical/administrative  experience including one year of the administrative supervisory experience as described in  1  above;  4. Education and/or experience equivalent to  1,  2,  or  3  above.  However, all candidates must possess the one year of administrative or supervisory experience as described in  1  above.  Education above the high school level may be substituted for the general clerical/administrative experience (but not for the one year of administrative or supervisory experience described in  1  above) at a rate of 30 semester credits from an accredited college for 6 months of experience up to a maximum of 3Â½ years.",
    preferred_skills: 'Candidates should have a strong customer service background, excellent oral and written communication skills, courteous telephone manner, basic computer skills with the desire to learn additional skills.',
    additional_information: '**IMPORTANT NOTES TO ALL CANDIDATES:  Please note:  If you are called for an interview you will be required to bring to your interview copies of original documentation, such as: â¢ A document that establishes identity for employment eligibility, such as: A Valid U.S. Passport, Permanent Resident Card/Green Card, or Driverâs license.    â¢ Proof of Education according to the education requirements of the civil service title.    â¢ Current Resume     â¢ Proof of Address/NYC Residency dated within the last 60 days, such as: Recent Utility Bill (i.e. Telephone, Cable, Mobile Phone)   Additional documentation may be required to evaluate your qualification as outlined in this postingâs âMinimum Qualification Requirementsâ section. Examples of additional documentation may be, but not limited to: college transcript, experience verification or professional trade licenses.  If after your interview you are the selected candidate you will be contacted to schedule an on-boarding appointment.   By the time of this appointment you will be asked to produce the originals of the above documents along with your original Social Security card.   **LOAN FORGIVENESS  The federal government provides student loan forgiveness through its Public Service Loan Forgiveness Program (PSLF) to all qualifying public service employees. Working with the DOHMH qualifies you as a public service employee and you may be able to take advantage of this program while working full-time and meeting the programâs other requirements.    Please visit the Public Service Loan Forgiveness Program site to view the eligibility requirements:   https://studentaid.ed.gov/sa/repay-loans/forgiveness-cancellation/public-service',
    to_apply: 'Apply online with a cover letter to https://a127-jobs.nyc.gov/.  In the Job ID search bar, enter: job ID number # 416232.  We appreciate the interest and thank all applicants who apply, but only those candidates under consideration will be contacted.  The NYC Health Department is committed to recruiting and retaining a diverse and culturally responsive workforce. We strongly encourage people of color, people with disabilities, veterans, women, and lesbian, gay, bisexual, and transgender and gender non-conforming persons to apply.  All applicants will be considered without regard to actual or perceived race, color, national origin, religion, sexual orientation, marital or parental status, disability, sex, gender identity or expression, age, prior record of arrest; or any other basis prohibited by law.',
    residency_requirement: 'New York City residency is generally required within 90 days of appointment. However, City Employees in certain titles who have worked for the City for 2 continuous years may also be eligible to reside in Nassau, Suffolk, Putnam, Westchester, Rockland, or Orange County. To determine if the residency requirement applies to you, please discuss with the agency representative at the time of interview.',
    posting_date: '2020-12-07T00:00:00.000',
    post_until: '07-MAR-2021',
    posting_updated: '2020-12-07T00:00:00.000',
    process_date: '2020-12-29T00:00:00.000'
  },
*/
