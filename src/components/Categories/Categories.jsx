import { Helmet } from 'react-helmet-async'
import MainCategory from '../MainCategory/MainCategory'
import SubCategories from '../SubCategories/SubCategories'


export default function Categories() {

  return <>
<Helmet>
  <title>Categories</title>
</Helmet>
<MainCategory/>
  </>
}
