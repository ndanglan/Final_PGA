import { makeStyles } from '@mui/styles'
import React, { useRef, useLayoutEffect } from 'react'

interface Props {
  tableRef: React.RefObject<HTMLTableElement>
}

const useStyles = makeStyles(({
  scrollbar: {
    overflowX: 'scroll',
    overflowY: 'hidden',
    height: '20px',
    position: 'fixed',
    zIndex: 9999,
    width: '1200px',
    bottom: 0,

    '& div': {
      height: '20px'
    }
  }
}))

const ScrollBar = (props: Props) => {
  const classes = useStyles();
  const { tableRef } = props
  const scrollRef = useRef<HTMLDivElement>(null)
  // handle remote scrollbar
  useLayoutEffect(() => {
    const scrollbar = scrollRef.current;

    if (!tableRef) {
      return;
    }

    const handleScroll = () => {
      if (tableRef.current && scrollbar) {
        const thumbBar = scrollbar.querySelector('div')
        if (thumbBar) {
          thumbBar.style.width = tableRef.current.scrollWidth + 'px';
        }

        tableRef.current.scrollLeft = scrollbar.scrollLeft;
      }
    }

    if (tableRef && scrollbar) {
      scrollbar.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollbar) {
        return scrollbar.removeEventListener('scroll', handleScroll)

      }
    }
  }, [tableRef])

  return (
    <div
      ref={scrollRef}
      id='scrollbar'
      className={classes.scrollbar}>
      <div style={{
        width: '1500px'
      }}></div>
    </div>
  )
}

export default ScrollBar