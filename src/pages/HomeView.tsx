import { Link } from 'react-router-dom'

export function Component() {
    return (
        <div className='flex gap-4'>
            <Link to='/about'>
                about
            </Link>
            <Link to='/'>
                home
            </Link>
        </div>
    )
}
export default Component
