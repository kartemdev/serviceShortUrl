import React from 'react';
import { useSelector } from 'react-redux';

function TableUrls() {
  const urls = useSelector((store) => store.shortUrls);

  const copyHandler = (e) => {
    e.preventDefault();
    const RESULT = `https://wdl-app-heroku-001.herokuapp.com/s/${e.nativeEvent.path[1].innerText.slice(0, 5)}`;
    if (RESULT) {
      navigator.clipboard.writeText(RESULT);
    }
  }
  return (
    <>
      <table className="table w-50 mt-3">
        <thead>
          <tr>
            <th scope="col">ShortUrl</th>
            <th scope="col">YourUrl</th>
            <th scope="col">CountClick</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((obj) => (
            <tr key={obj.id}>
              <td>
                <form >
                  <a href={(obj.longUrl).toString()} target="_blank" rel="noreferrer">{obj.shortUrl}</a>
                  <button onClick={copyHandler} type='button' className="btn btn-primary ms-1" name='copyBut'>copy</button>
                </form>
              </td>
              <td>
                <a href={(obj.longUrl).toString()} target="_blank" rel="noreferrer" title={obj.longUrl}>{obj.longUrl.slice(0, 30)}...</a>
              </td>
              <td>{obj.countClick}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableUrls;
