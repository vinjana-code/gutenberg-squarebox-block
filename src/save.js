/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { squareboxTitle, boxUrl, imageLink, backgroundColor } = attributes;

	return (
		<>
		<div { ...useBlockProps.save() }>
			<div className="wp-block-column curved-top-left square-box" style={{ background: backgroundColor }}> 
				<div className="wp-block-image"> 
					<figure className="aligncenter size-full"> 
						<a href={ boxUrl }> 
						   <img src={ imageLink } alt={ __('Selected image', 'gutenberg-squarebox-block') } width="100" height="100" />
						 </a> 
				    </figure> 
				</div> 
				<h1 className="wp-block-heading has-text-align-center"> 
					<a href={ boxUrl }>{ squareboxTitle }</a> 
				</h1> 
			</div>
		</div>
		</>
	);
}
