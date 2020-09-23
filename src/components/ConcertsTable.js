import React, { useState, useEffect } from 'react';

export default function ConcertsTable(props) {
  const { tableHeaders, concerts } = props;
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const filteredHeaders = tableHeaders.filter(
      (header) => header !== 'id' && header !== 'date'
    );
    setHeaders(filteredHeaders);
  }, [tableHeaders]);

  return (
    <table role="table" className="table">
      <TableHead headers={headers} />
      <tbody>
        {concerts &&
          concerts.map((concert) => (
            <TableRow concert={concert} headers={headers} key={concert.id} />
          ))}
      </tbody>
    </table>
  );
}

function TableHead(props) {
  const displayHeaders = [];
  props.headers.forEach((header) => {
    switch (header) {
      case 'id':
      case 'date':
        break;
      case 'displayDate':
        displayHeaders.push('Month, Day');
        break;
      case 'program':
        displayHeaders.push('Composer, Work');
        break;
      case 'location':
        displayHeaders.push('City, State');
        break;
      case 'venue':
        displayHeaders.push('Promoter, Venue');
        break;
      case 'participants':
        displayHeaders.push('Orchestra & Soloists');
        break;
      default:
        displayHeaders.push(header.charAt(0).toUpperCase() + header.slice(1));
    }
  });

  return (
    <thead>
      <tr role="row">
        {displayHeaders.map((header) => (
          <th role="columnheader" key={header}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow(props) {
  const { concert, headers } = props;
  return (
    <tr role="row">
      {Object.keys(concert)
        .filter((property) => headers.indexOf(property) !== -1)
        .map((property) => (
          <TableCell
            concert={concert}
            property={property}
            key={concert.id + property}
          />
        ))}
    </tr>
  );
}

function TableCell(props) {
  const { concert, property } = props;
  let seperator;
  switch (property) {
    case 'program':
      seperator = ':';
      break;
    case 'location':
      seperator = ',';
      break;
    default:
      seperator = '';
  }

  return (
    <td role="cell" key={property}>
      {Array.isArray(concert[property]) ? (
        <ul>
          {concert[property].map((line, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={createInnerHtml(line, seperator)}
            />
          ))}
        </ul>
      ) : (
        concert[property]
      )}
    </td>
  );
}

function createInnerHtml(content, seperator) {
  const text =
    typeof content === 'string'
      ? content
      : Object.values(content).join(`${seperator} `);
  return { __html: text };
}
