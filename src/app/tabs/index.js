import ListPlaces from '@/components/tabs/places/ListPlaces'
import ListPublish from '@/components/tabs/places/ListPublish'

import './styles/index.css'
import ListAgencies from '@/components/tabs/places/ListAgencies'

export default function HomeTab () {

    return (

        <>
        
            <ListPublish/>

            <ListAgencies/>

            <ListPlaces/>

        </>

    )

}