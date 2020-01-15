declare module '*.svg' {
	const content: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
	export default content
}

interface User extends firebase.User {
	bookmarks?: {}
}

interface NormalisedBookmark {
	index?: number
	title: string
	url?: string
	children?: Array<NormalisedBookmark>
}

interface BookmarkPair {
	local: browser.bookmarks.BookmarkTreeNode
	remote: NormalisedBookmark
}
