# Load necessary packages
library(ggplot2)
library(r2d3)

# Load in data
potroast <- read.csv("potroast.csv", 
                     header = TRUE,
                     # Convert all conditions to factors, keeping only cooking
                     # times as numeric
                     colClasses = c(rep("factor", 3), "numeric"))

# -----------------------------------------------------------------------------
# The ggplot2 variant:

# Put temperature on the X axis and cooking time on the Y axis
ggplot(potroast, aes(x = temperature, y = cooktime, group = day)) +
  # Make it a scatterplot; color points by day; shape points by pan type
  geom_point(aes(shape = pan, col = day)) +
  scale_color_discrete(type = RColorBrewer::brewer.pal(n = 8, name = "Set1")) +
  # Make the background a simple grid
  theme_minimal() +
  # Label X and Y axes
  labs(x = "Temperature (F)", y = "Cook time (minutes)")

# -----------------------------------------------------------------------------
# The D3.js variant:

# Make scatterplot
r2d3(data = potroast, script = "scatter.js")

# Make legend
r2d3(data = potroast, script = "legend.js")

