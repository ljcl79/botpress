import { Button } from '@blueprintjs/core'
import { isOperationAllowed, lang } from 'botpress/shared'
import React, { FC, useContext, useState } from 'react'

import style from '../../style.scss'
import { Context } from '../Store'

interface Props {
  onSubmit: (content: string) => Promise<any>
}

const CommentForm: FC<Props> = props => {
  const [content, setContent] = useState('')

  return (
    <div className={style.commentForm}>
      <textarea
        value={content}
        placeholder={lang.tr('module.hitl2.commentForm.addNote')}
        onChange={event => {
          setContent(event.target.value)
        }}
      ></textarea>
      <Button
        onClick={() => {
          // tslint:disable-next-line: no-floating-promises
          props.onSubmit(content).then(() => {
            setContent('')
          })
        }}
      >
        {lang.tr('module.hitl2.commentForm.submit')}
      </Button>
    </div>
  )
}

export default CommentForm
