<?php

$dir = __DIR__ . DIRECTORY_SEPARATOR . 'js';
$target = 'alljs.js';

$filesInfo = findFilesByExtension($dir, 'js', array($target));

$contents = '';
foreach ($filesInfo['files'] as $file) {
    $contents .= file_get_contents($file, false);
}

file_put_contents($dir . DIRECTORY_SEPARATOR . $target, $contents);
die;


function findFilesByExtension($dir, $extension, $exceptions)
{
    $Directory = new RecursiveDirectoryIterator($dir);
    $Iterator = new RecursiveIteratorIterator($Directory);

    $files = array();
    $filesize = 0;
    $modified = 0;
    foreach ($Iterator as $fileInfo) {
        if (
            $fileInfo->getExtension() == 'js'
            && ! in_array($fileInfo->getFilename(), $exceptions)
        ) {
            if ($modified < $fileInfo->getCTime()) {
                $modified = $fileInfo->getCTime();
            }
            $filesize += $fileInfo->getSize();
            $files[] = $fileInfo->getPath() . DIRECTORY_SEPARATOR . $fileInfo->getFilename();
        }
    }
    return array(
        'files' => $files,
        'modified' => $modified,
        'size'  => $filesize

    );
}

