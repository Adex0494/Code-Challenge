import React, {useState} from 'react'

const separateLines = (string: string) => {
  const listOfLines = string.split('\n')
  return listOfLines
}

const determineLineType = (string: string) => {
  const firstWord = string.split(' ')[0]
  if (firstWord === '#') return 'h1'
  if (firstWord === '##') return 'h2'
  if (firstWord === '*' || firstWord === '-') return 'li'
  return 'p'
}

const displayBlock = (string : string, typeOfLine : string, key : number) => {
  if (typeOfLine=== 'h1') {
    return <h1 key={key}>{string.slice(2)}</h1>
  }
  if (typeOfLine === 'h2') {
    return <h2 key={key}>{string.slice(3)}</h2>
  }

  if (typeOfLine === 'li') {
    return <li key={key}>{string.slice(2)}</li>
  }

  if (typeOfLine === 'p') {
    return <p key={key}>{string}</p>
  }

}

const parseMarkdown = (value : string) => {
  const linesArray = separateLines(value);
  const arrayOfBlocks : any [] = [];
  for (let i =0; i < linesArray.length; i++){
    const typeOfLine = determineLineType(linesArray[i])
    if (typeOfLine === 'h1'){
      arrayOfBlocks.push(displayBlock(linesArray[i], 'h1', i))
      continue
    }
    if (typeOfLine === 'h2'){
      arrayOfBlocks.push(displayBlock(linesArray[i], 'h2', i))
      continue
    }

    if (typeOfLine === 'li')
    {
        const ulBlock : any [] = [];
        ulBlock.push(displayBlock(linesArray[i], 'li', 0))
        for (let j = i+1; j < linesArray.length; j++ ){
          const typeOfLine = determineLineType(linesArray[j])
          if (typeOfLine === 'li'){
            ulBlock.push(displayBlock(linesArray[j], 'li', j))
          } else{
            i = j-1
            j= linesArray.length
          }
          if (j === linesArray.length -1) i = linesArray.length -1
        }
        arrayOfBlocks.push(<ul key={i}>{ulBlock.map(li => li)}</ul>)
    }

    if (typeOfLine === 'p'){
      arrayOfBlocks.push(displayBlock(linesArray[i], 'p', i))
    }

  }

  return arrayOfBlocks;
}



function App() {
  const [value, setValue] = useState('')


  return (
    <div style={{display: 'flex', gap: '20px'}}>
      <div>
      <textarea style={{
        height: '700px', width: '600px'
      }} onChange={(e) => setValue(e.target.value)} rows={5} value = {value} />
      </div>

      <div style={{
        borderStyle: 'solid',
        borderWidth: '5px',
        height: '700px',
        width: '600px'
      }}>{
        parseMarkdown(value).map((block) => block)
      }
      </div>
    </div>

  );
}

export default App;
