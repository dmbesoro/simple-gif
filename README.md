# Simple GIF Splitter 

Splits a GIF into a table of smaller gif
*Also able to split .jpg, png*

## Usage

1. Open `index.html` in browser
2. Click `Browse` to upload a GIF
3. Enter desired number of `Columns` and `Rows`
4. Click `Split GIF` to process the image

## Dependencies

- Bootstrap was added but was not used much

## Solution

Originally I was thinking of splitting the image by frame and cutting them individually. This ended up being too complicated and would use a lot more libraries. I ended up just generating the image multiple times and cropping them to the right dimension and positioning them using a table. The solution was more memory hungry(specially in larger number of rows and columns) but was more simple to implement and did not use external packages.  
There are still some bugs but I was able to remedy most of them. 

