import quizLogo from '../assets/quiz-logo.png';

function Header() {
  return (
      <header>
      <img src={quizLogo} alt="special logo of the app" />
      <h1>quizByReact</h1>
    </header>
  )
}

export default Header