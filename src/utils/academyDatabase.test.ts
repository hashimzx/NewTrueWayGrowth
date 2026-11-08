import { test } from 'node:test';
import assert from 'node:assert';
import { 
  DEFAULT_QURAN_COURSES, 
  DEFAULT_TEACHERS, 
  DEFAULT_ACADEMY_USERS, 
  DEFAULT_CLASS_SCHEDULES,
  DEFAULT_DAILY_LESSONS,
  DEFAULT_ATTENDANCE_LOGS,
  DEFAULT_TRIAL_BOOKINGS
} from './academyDatabase';

test('DEFAULT_QURAN_COURSES contains all 5 required core Quran courses', () => {
  assert.strictEqual(DEFAULT_QURAN_COURSES.length, 5);
  const courseIds = DEFAULT_QURAN_COURSES.map(c => c.id);
  assert.ok(courseIds.includes('course-madani-qaida'));
  assert.ok(courseIds.includes('course-quran-tajweed'));
  assert.ok(courseIds.includes('course-quran-hifz'));
  assert.ok(courseIds.includes('course-quran-translation'));
  assert.ok(courseIds.includes('course-islamic-studies'));

  DEFAULT_QURAN_COURSES.forEach(course => {
    assert.ok(course.title.length > 0);
    assert.ok(course.arabicTitle.length > 0);
    assert.ok(course.description.length > 0);
    assert.ok(course.keyBenefits.length > 0);
    assert.ok(course.syllabus.length > 0);
    assert.ok(course.prices.USD > 0);
    assert.ok(course.prices.GBP > 0);
  });
});

test('DEFAULT_TEACHERS contains certified male and female scholars', () => {
  assert.ok(DEFAULT_TEACHERS.length >= 4);
  const male = DEFAULT_TEACHERS.filter(t => t.gender === 'male');
  const female = DEFAULT_TEACHERS.filter(t => t.gender === 'female');
  assert.ok(male.length > 0);
  assert.ok(female.length > 0);

  DEFAULT_TEACHERS.forEach(teacher => {
    assert.ok(teacher.name.length > 0);
    assert.ok(teacher.qualifications.length > 0);
    assert.ok(teacher.ijazah.length > 0);
    assert.ok(teacher.languages.length > 0);
    assert.ok(teacher.rating >= 4.5);
  });
});

test('DEFAULT_ACADEMY_USERS includes student, teacher, and admin with role separation', () => {
  const roles = DEFAULT_ACADEMY_USERS.map(u => u.role);
  assert.ok(roles.includes('student'));
  assert.ok(roles.includes('instructor'));
  assert.ok(roles.includes('admin'));

  const student = DEFAULT_ACADEMY_USERS.find(u => u.role === 'student');
  assert.ok(student);
  assert.ok((student.enrolledCourseIds?.length ?? 0) > 0);
  assert.ok(student.assignedTeacherId);
});

test('DEFAULT_CLASS_SCHEDULES has meeting platform links', () => {
  assert.ok(DEFAULT_CLASS_SCHEDULES.length > 0);
  DEFAULT_CLASS_SCHEDULES.forEach(sch => {
    assert.ok(sch.studentId);
    assert.ok(sch.teacherId);
    assert.ok(sch.meetingUrl.startsWith('https://'));
    assert.ok(sch.durationMinutes >= 30);
  });
});

test('DEFAULT_DAILY_LESSONS validates Sabaq, Sabqi, and Tajweed scores', () => {
  assert.ok(DEFAULT_DAILY_LESSONS.length > 0);
  DEFAULT_DAILY_LESSONS.forEach(les => {
    assert.ok(les.sabaqTitle.length > 0);
    assert.ok(les.tajweedScore >= 0 && les.tajweedScore <= 100);
    assert.ok(les.makharijScore >= 0 && les.makharijScore <= 100);
  });
});

test('DEFAULT_TRIAL_BOOKINGS has workflow status states', () => {
  assert.ok(DEFAULT_TRIAL_BOOKINGS.length > 0);
  const trial = DEFAULT_TRIAL_BOOKINGS[0];
  assert.ok(trial.studentName.length > 0);
  assert.ok(trial.parentPhone.length > 0);
  assert.ok(['new', 'contacted', 'scheduled', 'enrolled', 'cancelled'].includes(trial.status));
});
