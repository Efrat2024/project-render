import NavUser from '../../design/modules/views/navUser'
import { useGetVacationsQuery } from '../vacationApiSlice';


const Vacations = () => {

    const {
        data,
        isLoading,
        isError,
        error
    } = useGetVacationsQuery()
    if (isLoading) return <h1>טוען</h1>
    if (isError) return <h2>{error}</h2>

    return (
        <>
            <NavUser />
            <productList data={data} />
        </>
    )

}
export default Vacations