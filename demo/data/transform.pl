#!/usr/bin/perl
#
use strict;
use Data::Dumper;


#my $v = rand();
#print "v=$v\n";

my $top =  "top.csv.orig";
my $ofile = "top.csv";
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
        my ($rel_contrib, $avg_wt) = ($d[5], $d[6]);
        #print "$rel_contrib, $avg_wt\n";
        $rel_contrib *= rand();
        $avg_wt *= rand();
        print $ofh "$d[0],$d[1],$d[2],$d[3],$d[4],$rel_contrib,$avg_wt,$d[7]\n";
}

close($ifh);
close($ofh);
