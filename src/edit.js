/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes,setAttributes }) {
	const { squareboxTitle, boxUrl, imageLink, backgroundColor } = attributes;
	const onSelectMedia = (media) => { setAttributes({ mediaId: media.id, mediaUrl: media.url }); };
	const [defaultColors] = useState([
        { name: 'Blue', color: '#337480' },
        { name: 'Gold', color: '#dfc57e' },
        { name: 'Orange', color: '#ec8c59' },
        { name: 'Green', color: '#3ba776' },
        { name: 'Purple', color: '#6b4fd8' },
    ]);
	return (
		<>
		    <InspectorControls>
				<PanelBody title={ __('Box Settings', 'gutenberg-squarebox') }>
				<TextControl
                            label={__('Anchor Link', 'gutenberg-squarebox')}
                            value={boxUrl}
                            onChange={(value) => setAttributes({ boxUrl: value })}
                        />
                        <MediaUploadCheck>
                        <MediaUpload
							onSelect={(media) => setAttributes({ imageLink: media?.url || '' })}
							allowedTypes={['image']}
							render={({ open }) => (
								<div>
                        {imageLink && (
                            <div>
                                <img
                                    src={imageLink}
                                    alt={__('Selected image', 'gutenberg-squarebox-block')}
                                    style={{ width: '100px'}}
                                />
                            </div>
                        )}
                        <Button onClick={open} isPrimary style={{ marginBottom: '15px', marginTop: '5px' }}>
                            {imageLink ? __('Replace Image', 'gutenberg-squarebox-block') : __('Choose Image', 'gutenberg-squarebox-block')}
                        </Button>
                    </div>
							)}
						/>
						</MediaUploadCheck>
				
                        <TextControl
                            label={__('Heading Title', 'gutenberg-squarebox')}
                            value={squareboxTitle}
                            onChange={(value) => setAttributes({ squareboxTitle: value })}
                        />
						
					 <ColorPalette
                        colors={defaultColors}
                        value={backgroundColor}
                        onChange={(color) => setAttributes({ backgroundColor: color })}
                    />
                   
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div className="wp-block-column curved-top-left square-box" style={{  
            background: backgroundColor  }}>
							<div className="wp-block-image">
								<figure className="aligncenter size-full">
									<a href={ boxUrl }>
										<img src={ imageLink } alt="" width="100" height="100" />
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
