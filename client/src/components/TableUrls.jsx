import React from 'react';
import { useSelector } from 'react-redux';

function TableUrls() {
  const urls = useSelector((store) => store.shortUrls);
  return (
    <>
      <table className="table w-50 mt-3">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ShortUrl</th>
            <th scope="col">YourUrl</th>
            <th scope="col">CountClick</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((obj) => (
            <tr key={obj.id}>
              <th scope="row">{obj.id}</th>
              <td><a href={(obj.longUrl).toString()} target="_blank" rel="noreferrer">{obj.shortUrl}</a></td>
              <td><a href={(obj.longUrl).toString()} target="_blank" rel="noreferrer">{obj.longUrl}</a></td>
              <td>{obj.countClick}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableUrls;
