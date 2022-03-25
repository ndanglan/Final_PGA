import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'

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
    bottom: 0,

    '& div': {
      height: '20px'
    }
  }
}))

const ScrollBar = (props: Props) => {
  const classes = useStyles();
  const { tableRef } = props
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollTrackWidth, setScrollTrackWidth] = useState<number | undefined>();

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

  useEffect(() => {
    setScrollTrackWidth(tableRef.current?.clientWidth)
  }, [tableRef])

  return (
    <>
      <div
        ref={scrollRef}
        id='scrollbar'
        className={classes.scrollbar}
        style={{
          width: scrollTrackWidth
        }}
      >
        <div style={{
          width: '1500px'
        }}></div>
      </div>
    </>

  )
}

export default ScrollBar