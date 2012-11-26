<?php

$levelDef = isset($_POST['leveldef']) ? json_decode($_POST['leveldef'], true) : null;

if (
        $levelDef != null && isset($levelDef['name']) &&  isset($levelDef['starts'])
        && isset($levelDef['finishes']) &&  isset($levelDef['board'])
        &&  isset($levelDef['gold']) && isset($levelDef['author'])
) {
    $levelDefStr = convertToString($levelDef);
    echo '<pre>' . $levelDefStr . '</pre>';
} else {
    die('no valid leveldef string passed.');
}



mail(
    'sattevelt@gmail.com',
    'level submitted',
    $levelDefStr,
    'From: pipes@steven-attevelt.nl' . "\r\n" .
    'Reply-To: sattevelt@gmail.com' . "\r\n"
);
die('end');




function convertToString($levelDef)
{
    $availableGold = 0;
    $tileDefRegex = '/(bl|b|c|s|t)(_r([r0-3]))?(_g([0-2]))?/';
    $matches = array();
    $board = $levelDef['board'];
    $boardHeight = count($board);
    $boardWidth = count($board[0]);
    $boardStr = "[\n";
    $startsStr = "[\n";
    $finishesStr = "[\n";


    for ($i = 0; $i < $boardHeight; $i++) {

        if (count($board[$i]) != $boardWidth) {
            return 'error';
        }
        $tileDefs = array();

        for ($j = 0; $j < $boardWidth; $j++) {
            if (preg_match($tileDefRegex, $board[$i][$j], $matches)) {
                $type = $matches[1];
                $rotation = isset($matches[3]) ? $matches[3] : 'r';
                $gold = isset($matches[5]) ? $matches[5] : 0;
                $tileDefs[] = '\'' . $type . '_r' . $rotation . '_g' . $gold . '\'';
                $availableGold += $gold;
            } else {
                return '';
            }

        }

        $boardStr .= "\t\t[" . implode(',', $tileDefs) . ']';
        if ($i + 1 < $boardHeight) {
            $boardStr .= ',';
        }
        $boardStr .= "\n";
    }
    $boardStr .= "\t]";

    $first = true;
    foreach ($levelDef['finishes'] as $finish) {
        if ($first) {
            $first = false;
        } else {
            $finishesStr .= ",\n";
        }
        $finishesStr .= "\t\t[" . implode(',', $finish) . ']';
    }
    $finishesStr .= "\n\t]";

    $first = true;
    foreach ($levelDef['starts'] as $start) {
        if ($first) {
            $first = false;
        } else {
            $startsStr .= ",\n";
        }
        $startsStr .= "\t\t[" . implode(',', $start) . "]";
    }
    $startsStr .= "\n\t]";

    $str = "{\n";
    $str .= "\tname: '" . $levelDef['name'] . "',\n";
    $str .= "\tauthor: '" . $levelDef['author'] . "',\n";
    $str .= "\tboard: " . $boardStr . ",\n";
    $str .= "\tstarts: " . $startsStr . ",\n";
    $str .= "\tfinishes: " . $finishesStr . ",\n";
    $str .= "\tgold: 0,\n";
    $str .= "\tfinished: false\n";
    $str .= "}";

    return $str;
}
