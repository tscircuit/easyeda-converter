This repo converts JSON easyeda JSON files into Circuit JSON, it also can
convert the Circuit JSON into tscircuit tsx.

When doing conversions, keep in mind that Circuit JSON considers XY to be
the plane of the board (Z+ is "above the board") but models from EasyEDA
could have Y and Z swapped. In general, be very careful when working with the
axes.
