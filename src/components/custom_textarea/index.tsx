import React, { useState, useCallback, useRef } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, DraftHandleValue } from 'draft-js';
import { BiBold, BiItalic, BiLink, BiUnderline } from 'react-icons/bi';
import { RiListOrdered2, RiListUnordered } from 'react-icons/ri';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import './index.css'


interface CustomAreaProps{
  onContentChange: (value: string, length: number) => void
}

const CustomTextArea: React.FC<CustomAreaProps> = ( props ) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [HTMLContent, setHTMLContent] = useState('');
  const editorRef = useRef<Editor>(null);

  const handleInlineStyle = (style: string) => {
    setEditorState((prevEditorState) => {
      const newState = RichUtils.toggleInlineStyle(prevEditorState, style);
      setIsBold(newState.getCurrentInlineStyle().has('BOLD'));
      setIsItalic(newState.getCurrentInlineStyle().has('ITALIC'));
      setIsUnderline(newState.getCurrentInlineStyle().has('UNDERLINE'));
      return newState;
    })
  };

  const handleBlockType = (blockType: string) => {
    setEditorState((prevEditorState) => {
      const newState = RichUtils.toggleBlockType(prevEditorState, blockType);
      setIsOrderedList(newState.getCurrentContent().getBlockForKey(newState.getSelection().getStartKey()).getType() === 'ordered-list-item');
      setIsUnorderedList(newState.getCurrentContent().getBlockForKey(newState.getSelection().getStartKey()).getType() === 'unordered-list-item');
      return newState;
    })
  };

  const handleAddLink = () => {
    const selection = editorState.getSelection();
    const link = window.prompt('Enter a URL:');
    if (!link) {
      return;
    }

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const contentWithLink = EditorState.set(editorState, {
      currentContent: contentWithEntity,
    });

    setEditorState(RichUtils.toggleLink(contentWithLink, selection, entityKey));
  };

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleEditorChange = useCallback((newEditorState: EditorState) => {
    setEditorState(newEditorState);
    setHTMLContent(stateToHTML(newEditorState.getCurrentContent()));
    const newHTMLContent = stateToHTML(newEditorState.getCurrentContent()).replaceAll("\n", "")
    props.onContentChange(newHTMLContent, getTextLengthWithoutHtml(newHTMLContent))
  }, []);

  const handleKeyCommand = (command: string, currentEditorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(currentEditorState, command);

    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const getTextLengthWithoutHtml = (htmlString: string): number => {
    const plainText = htmlString.replace(/<[^>]*>/g, '');
    const textLength = plainText.length;

    return textLength;
  };

  return (
    <div className='iw'>
      <div className='bg-[#fafafa] w-full flex justify-around items-center rounded-t-md p-4 gap-6 border'>
        {isBold ? (
          <button 
            className='text-[#668AE4] transition-all p-1 
                       bg-opacity-10 bg-[#668AE4] rounded-md' 
            onClick={() => handleInlineStyle('BOLD')}
            >
              <BiBold/>
           </button>
        ):(
          <button className='p-1' onClick={() => handleInlineStyle('BOLD')}><BiBold/></button>
        )}
        {isItalic ? (
          <button 
            className='text-[#668AE4] transition-all p-1 
                       bg-opacity-10 bg-[#668AE4] rounded-md' 
            onClick={() => handleInlineStyle('ITALIC')}
            >
              <BiItalic/>
           </button>
        ):(
          <button className='p-1' onClick={() => handleInlineStyle('ITALIC')}><BiItalic/></button>
        )}
        {isUnderline ? (
          <button 
            className='text-[#668AE4] transition-all p-1 
                       bg-opacity-10 bg-[#668AE4] rounded-md' 
            onClick={() => handleInlineStyle('UNDERLINE')}
            >
              <BiUnderline/>
           </button>
        ):(
          <button className='p-1' onClick={() => handleInlineStyle('UNDERLINE')}><BiUnderline/></button>
        )}
        {isUnorderedList ? (
          <button 
            className='text-[#668AE4] transition-all p-1 
                       bg-opacity-10 bg-[#668AE4] rounded-md' 
            onClick={() => handleBlockType('unordered-list-item')}
            >
              <RiListUnordered/>
           </button>
        ):(
          <button className='p-1' onClick={() => handleBlockType('unordered-list-item')}><RiListUnordered/></button>
        )}
        {isOrderedList ? (
          <button 
            className='text-[#668AE4] transition-all p-1 
                       bg-opacity-10 bg-[#668AE4] rounded-md' 
            onClick={() => handleBlockType('ordered-list-item')}
            >
              <RiListOrdered2/>
           </button>
        ):(
          <button className='p-1' onClick={() => handleBlockType('ordered-list-item')}><RiListOrdered2/></button>
        )}
        <button onClick={() => handleAddLink()}><BiLink/></button>
      </div>
      <div className='overflow-y-scroll rounded-b-md border p-6 w-full' style={{ height: '200px' }}>
        <Editor
          ref={editorRef}
          placeholder='Questa è la storia più cringe che abbia mai raccontato...'
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default CustomTextArea;
