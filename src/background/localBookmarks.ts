// try and guess the bookmarks toolbar id.
// it's not consistent...
export const getUIBarID = browser.bookmarks
	.get('toolbar_____') // firefox?
	.then(() => 'toolbar_____')
	.catch(() => '1') // assume chromium

export const collectBookmarks = async ({
	title,
	url,
	id,
}: browser.bookmarks.BookmarkTreeNode) => {
	if (url) return { title, url }

	const bookmarkChildren: browser.bookmarks.BookmarkTreeNode[] = await browser.bookmarks.getChildren(
		id,
	)

	const children: NormalisedBookmark[] = await Promise.all(
		bookmarkChildren.map(collectBookmarks),
	)

	return { title, children }
}

const getUIBar = async () => {
	const UIBarID = await getUIBarID
	const UIBar = await browser.bookmarks.get(UIBarID)

	return UIBar[0]
}

export const getLocalBookmarks = () =>
	getUIBar()
		.then(collectBookmarks)
		.then(bookmarks => ({
			UIBar: bookmarks.children,
		}))
