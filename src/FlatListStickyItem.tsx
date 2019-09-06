import React from 'react'
import { FlatList, StyleSheet, View, SafeAreaView } from 'react-native'

interface IProps {
  stickyIndex: number
  itemHeight: number
  data: [any]
  renderItem: ({ item }) => any
}

interface IState {
  topVisible: boolean
  bottomVisible: boolean
}

export default class FlatListStickyItem extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props)

    this.viewabilityConfigCallbackPairs = [
      {
        viewabilityConfig: {
          minimumViewTime: 1,
          itemVisiblePercentThreshold: 100
        },
        onViewableItemsChanged: this.handleItemsInViewPort
      }
    ]

    this.state = {
      topVisible: false,
      bottomVisible: true
    }
  }

  handleItemsInViewPort = info => {
    const { viewableItems, changed } = info
    const { bottomVisible, topVisible } = this.state
    const { stickyIndex } = this.props

    const _bottomVisible =
      viewableItems[viewableItems.length - 1].index < stickyIndex

    if (bottomVisible !== _bottomVisible) {
      this.setState({ bottomVisible: _bottomVisible })
    }

    const _topVisible = viewableItems[0].index > stickyIndex

    if (topVisible !== _topVisible) {
      this.setState({ topVisible: _topVisible })
    }
  }

  getItemLayout = (data, index) => {
    const { itemHeight } = this.props
    return {
      length: itemHeight,
      offset: itemHeight * index,
      index
    }
  }

  render() {
    const { topVisible, bottomVisible } = this.state
    const { renderItem, data, stickyIndex } = this.props

    if (!data) {
      return null
    }

    const stickyData =
      stickyIndex > data.length ? null : { item: data[stickyIndex] }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {stickyData && topVisible && (
            <View style={styles.stickyTop}>{renderItem(stickyData)}</View>
          )}
          <FlatList
            style={styles.list}
            data={data}
            renderItem={renderItem}
            getItemLayout={this.getItemLayout}
            removeClippedSubviews={true}
            viewabilityConfigCallbackPairs={this.viewabilityConfigCallbackPairs}
          />
          {stickyData && bottomVisible && (
            <View style={styles.stickyBottom}>{renderItem(stickyData)}</View>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1
  },
  stickyTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  }
})
