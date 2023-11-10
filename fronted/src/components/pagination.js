const Pagination = () => {
  return (
    <>

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={previousPage}> Prev </a>
          </li>
          {
            numbers.map((n, i) => (
              <li className={
                `page-item${currentPage == n ? 'active' : ""}`} key={i}>
                <a href="#" className="page-item" onClick={() => changeCurPage(n)}> {n} </a>
              </li>
            ))
          }
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}> Next </a>
          </li>

        </ul>
      </nav>
    </>
  )
}
