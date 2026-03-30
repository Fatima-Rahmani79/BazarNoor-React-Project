import { useDispatch } from 'react-redux'
import { fetchProducts } from './features/products/productsSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
