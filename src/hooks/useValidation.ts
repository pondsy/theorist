export default function useValidation() {

  function validateTitle(title: string): string | undefined {
    if (title.trim() === "") return 'Title required!';
    if (title.length > 60) return 'Title is too long!';
    return;
  }

  function validateQuestion(question: string): string|undefined {
    if (question.trim() === "") return 'Question required!';
    if (question.length > 100) return 'Question is too long!'
    return;
  }

  function validateOptions(options: any[]): string|undefined {
    if (options.length === 0) return 'You must set options for multi-choice questions!';
    return;
  }

  function validateQuestions(questions: any[]): string|undefined {
    if (questions.length === 0) return 'You must set questions!';
    return;
  }

  function validateEmail(email: string): string | undefined {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return;
    if (email.trim() === "") return 'Email is required!';
    return 'Invalid email!';
  }

  function validatePassword(password: string): string | undefined {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) return;
    if (password.trim() === "") return 'Password required!';
    if (password.length < 6) return 'Password is too short!';
    if (!/[a-zA-Z]/.test(password)) return 'Password doesn\'t contain any letters!';
    if (!/\d/.test(password)) return 'Password doesn\'t contain any digits!';
  }

  return {
    validateTitle,
    validateQuestion,
    validateOptions,
    validateQuestions,
    validateEmail,
    validatePassword
  };
};