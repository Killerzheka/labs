<?php
session_start();
// Initialize game state
if (!isset($_SESSION['board']) || isset($_POST['reset'])) {
    $_SESSION['board'] = array_fill(0, 9, '');
    $_SESSION['player'] = 'X';
    $_SESSION['winner'] = null;
}

// Handle move
if (isset($_POST['cell']) && $_SESSION['winner'] === null) {
    $i = intval($_POST['cell']);
    if ($_SESSION['board'][$i] === '') {
        $_SESSION['board'][$i] = $_SESSION['player'];
        // Check for win
        $lines = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        foreach ($lines as $line) {
            if (
                $_SESSION['board'][$line[0]] &&
                $_SESSION['board'][$line[0]] === $_SESSION['board'][$line[1]] &&
                $_SESSION['board'][$line[1]] === $_SESSION['board'][$line[2]]
            ) {
                $_SESSION['winner'] = $_SESSION['player'];
                break;
            }
        }
        // Check for draw
        if ($_SESSION['winner'] === null && !in_array('', $_SESSION['board'])) {
            $_SESSION['winner'] = 'Draw';
        }
        // Switch player
        if ($_SESSION['winner'] === null) {
            $_SESSION['player'] = ($_SESSION['player'] === 'X') ? 'O' : 'X';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Хрестики-нолики</title>
    <style>
        table { margin: 20px auto; border-collapse: collapse; }
        td {
            width: 60px; height: 60px;
            text-align: center; vertical-align: middle;
            font-size: 2em; border: 1px solid #333;
        }
        button { width: 100%; height: 100%; font-size: inherit; }
        .info { text-align: center; margin-top: 10px; }
    </style>
</head>
<body>
<form method="post">
    <table>
        <?php for ($row = 0; $row < 3; $row++): ?>
            <tr>
                <?php for ($col = 0; $col < 3; $col++): ?>
                    <?php $idx = $row*3 + $col; ?>
                    <td>
                        <?php if ($_SESSION['board'][$idx] === '' && $_SESSION['winner'] === null): ?>
                            <button type="submit" name="cell" value="<?= $idx ?>"></button>
                        <?php else: ?>
                            <?= htmlspecialchars($_SESSION['board'][$idx]) ?>
                        <?php endif; ?>
                    </td>
                <?php endfor; ?>
            </tr>
        <?php endfor; ?>
    </table>
    <div class="info">
        <?php if ($_SESSION['winner'] === 'Draw'): ?>
            <p>Нічия!</p>
        <?php elseif ($_SESSION['winner']): ?>
            <p>Переміг <?= $_SESSION['winner'] ?>!</p>
        <?php else: ?>
            <p>Зараз ходить <?= $_SESSION['player'] ?></p>
        <?php endif; ?>
        <button type="submit" name="reset">Почати заново</button>
    </div>
</form>
</body>
</html>
