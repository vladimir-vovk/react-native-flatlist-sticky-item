import React, { useState, useEffect } from 'react'
import { Platform, View, Text, StyleSheet } from 'react-native'
import FlatListStickyItem from './FlatListStickyItem'
import { randomColor } from './utils'

const ITEM_HEIGHT = 60
const NUMBER_OF_ITEMS = 50
const STICKY_INDEX = 19

export default function MainScreen() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const _data = Array.from({ length: NUMBER_OF_ITEMS }).map((e, i) => ({
      key: String(i),
      text: Platform.OS === 'ios' ? 'ios' : 'android',
      backgroundColor: randomColor()
    }))
    setData(_data)
  }, [])

  function renderItem({ item }) {
    const { key, text, backgroundColor } = item
    return (
      <View style={[styles.item, { backgroundColor }]}>
        <Text style={{ backgroundColor }}>{`${Number(key) + 1} ${text}`}</Text>
      </View>
    )
  }

  return (
    <FlatListStickyItem
      stickyIndex={STICKY_INDEX}
      itemHeight={ITEM_HEIGHT}
      data={data}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
