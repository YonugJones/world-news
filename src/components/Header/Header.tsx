/*
Static
	•	App title: World News
	•	Optional subtitle/tagline
	•	No state
	•	No fetch logic
*/

export function Header() {
  return (
    <header className='flex flex-col text-center'>
      <h1 className='text-4xl text-slate-800 font-semibold'>World News</h1>
      <p className='text-slate-500'>API-driven headlines and stories.</p>
    </header>
  )
}
