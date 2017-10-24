#!/usr/bin/perl
#
use strict;
use Data::Dumper;


#my $v = rand();
#print "v=$v\n";

my $top =  "bottom.csv.orig";
my $ofile = "bottom.csv";
my ($line, $ifh, $ofh);
open($ifh, "<$top");
open($ofh, ">$ofile");

my $header = <$ifh>;
print $ofh "$header";
#my @data = <$ifh>;

#
#print Dumper(\@data), "\n";

while ($line = <$ifh>) {
        chomp($line);
        my @d = split(/,/, $line);
        #print Dumper(\@d), "\n";
        my ($rel_wt, $avg_wt, $stock_sel, $sector_sel,$tot) = ($d[1], $d[2], $d[3], $d[4], $d[5]);
        $rel_wt *= rand();
        $avg_wt *= rand();
        $stock_sel *= rand();
        $sector_sel *= rand();
        $tot *= rand();

        print $ofh "$d[0],$rel_wt, $avg_wt, $stock_sel, $sector_sel,$tot\n";
}

close($ifh);
close($ofh);
