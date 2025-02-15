function isNumber(r) { return !((r += "").length < 1) && !isNaN(r) }

function trimAll(r) {
    for (;
        " " == r.substring(0, 1);) r = r.substring(1, r.length);
    for (;
        " " == r.substring(r.length - 1, r.length);) r = r.substring(0, r.length - 1);
    return r
}

function cleanNumberInput(r) { for (var e = r + ""; - 1 < e.indexOf(" ") || -1 < e.indexOf("\t") || -1 < e.indexOf(",");) e = e.replace(" ", "").replace("\t", "").replace(",", ""); return e }

function gnumberFormat(r) {
    if (0 <= (s = "" + r).indexOf("N") || r == 2 * r && r == 1 + r) return "Error ";
    if (0 <= (i = s.indexOf("e"))) {
        var e = s.substring(i + 1, s.length);
        if (11 < i && (i = 11), (s = s.substring(0, i)).indexOf(".") < 0) s += ".";
        else {
            for (j = s.length - 1; 0 <= j && "0" == s.charAt(j);) --j;
            s = s.substring(0, j + 1)
        }
        s += "E" + e
    } else {
        var n = !1;
        r < 0 && (r = -r, n = !0);
        for (var t = r - (a = Math.floor(r)), c = 12 - ("" + a).length - 1, e = "" == (e = " 1000000000000000000".substring(1, 2 + c)) || " " == e ? 1 : parseInt(e), t = Math.floor(t * e + .5), a = Math.floor(Math.floor(r * e + .5) / e), s = n ? "-" + a : "" + a, o = "00000000000000" + t, i = (o = o.substring(o.length - c, o.length)).length - 1; 0 <= i && "0" == o.charAt(i);) --i;
        o = o.substring(0, i + 1), 0 <= i && (s += "." + o)
    }
    return s
}

function ucParseSelectValue(r) {
    var e = r.split("["),
        r = [];
    return r.push(trimAll(e[0])), r.push(trimAll(e[1].replace("]", ""))), 2 < e.length && r.push(trimAll(e[2].replace("]", ""))), r
}

function ucCalculateResultNumOnly(inVal, inFrom, inTo) {
    var tempResult = 0,
        tempInVal = inVal,
        tempInFrom = inFrom + "",
        tempInTo = inTo + "";
    if (0 < tempInFrom.indexOf(":") || 0 < tempInTo.indexOf(":"))
        if (tempArrayFrom = tempInFrom.split(":"), tempArrayTo = tempInTo.split(":"), 3 == tempArrayFrom.length || 3 == tempArrayTo.length) eval("tempResult = ((" + inVal + "-(" + tempArrayFrom[2] + "))/((" + tempArrayFrom[1] + ")-(" + tempArrayFrom[2] + ")))*((" + tempArrayTo[1] + ")-(" + tempArrayTo[2] + "))+(" + tempArrayTo[2] + ");");
        else {
            if ("3" == tempArrayFrom[0] || "3" == tempArrayTo[0]) return eval('tempResult = (parseInt("' + inVal + '", ' + tempArrayFrom[1] + ")).toString(" + tempArrayTo[1] + ");"), (tempResult + "").toUpperCase();
            0 < tempInFrom.indexOf(":") ? 0 < tempInTo.indexOf(":") ? eval("tempResult = " + tempInVal + "*" + tempArrayTo[1] + "/" + tempArrayFrom[1]) : eval("tempResult = 1/" + tempInVal + "*" + tempArrayFrom[1] + "*" + tempInTo) : eval("tempResult = 1/" + tempInVal + "*" + tempInFrom + "*" + tempArrayTo[1])
        }
    else eval("tempResult = " + tempInVal + "*" + tempInTo + "/" + tempInFrom);
    return tempResult
}

function ucCalculateResult(r, e, n) { return !(0 < n.indexOf(":")) || "3" != n.split(":")[0] ? gnumberFormat(ucCalculateResultNumOnly(r, e, n)) : ucCalculateResultNumOnly(r, e, n) }

function ucUpdateResult() {
    return
    for (var r = cleanNumberInput(document.getElementById("ucCourts").value), e = document.getElementById("ucCostPerCourt"), n = document.getElementById("ucCostPerCourt"), t = e.value, c = n.value, a = 0, s = 0; s < n.options.length; s++) n.options[s].selected && (a = s);
    if (1 == noValidation) {
        r = trimAll((r + "").toUpperCase());
        var o = ucParseSelectValue(t),
            i = ucParseSelectValue(c);
        tempBaseNum = parseInt(o[1].substr(2).replace("]", ""));
        var l = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (tempRegStr = "", tempRegStr = 10 < tempBaseNum ? "^[0-9A-" + l.substr(tempBaseNum, 1) + "]+$" : "^[0-" + l.substr(tempBaseNum, 1) + "]+$", new RegExp(tempRegStr).test(r)) {
            var u = 1;
            u = ucCalculateResult(r, o[1], i[1]), document.getElementById("ucShuttles").value = u, document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + r + " " + o[0] + " = " + u + " " + i[0], document.getElementById("ucresult").style.color = "black";
            for (s = 0; s < n.options.length; s++) {
                var p = ucParseSelectValue(n.options[s].value),
                    m = "",
                    u = 0;
                u = ucCalculateResult(r, o[1], p[1]), m = p[0] + " (" + u + ")", n.options[s] = new Option(m, n.options[s].value), a == s && (n.options[s].selected = !0)
            }
        } else {
            0 < r.length ? (document.getElementById("ucresult").innerHTML = "Please provide a valid number!", document.getElementById("ucresult").style.color = "red") : document.getElementById("ucresult").innerHTML = "", document.getElementById("ucShuttles").value = "";
            for (s = 0; s < n.options.length; s++) {
                m = "";
                m = 2 < (p = ucParseSelectValue(n.options[s].value)).length ? p[0] + " [" + p[1] + "]" : p[0], n.options[s] = new Option(m, n.options[s].value), a == s && (n.options[s].selected = !0)
            }
        }
    } else {
        e = r.indexOf("/"), l = r;
        if (0 < e && 2 == (p = r.split("/")).length && isNumber(p[0]) && (isNumber(p[1]) ? r = parseFloat(p[0]) / parseFloat(p[1]) : (r = p[0], l = p[0]), r += ""), isNumber(r)) {
            o = ucParseSelectValue(t), i = ucParseSelectValue(c), u = 1;
            u = 2 < o.length ? 2 < i.length ? ucCalculateResult(r, o[2], i[2]) : ucCalculateResult(r, o[2], i[1]) : 2 < i.length ? ucCalculateResult(r, o[1], i[2]) : ucCalculateResult(r, o[1], i[1]), document.getElementById("ucShuttles").value = u, document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + l + " " + o[0] + " = " + u + " " + i[0], document.getElementById("ucresult").style.color = "black";
            for (s = 0; s < n.options.length; s++) {
                m = "", u = 0;
                m = 2 < (p = ucParseSelectValue(n.options[s].value)).length ? (u = 2 < o.length ? ucCalculateResult(r, o[2], p[2]) : ucCalculateResult(r, o[1], p[2]), p[0] + " [" + p[1] + "] (" + u + ")") : (u = 2 < o.length ? ucCalculateResult(r, o[2], p[1]) : ucCalculateResult(r, o[1], p[1]), p[0] + " (" + u + ")"), n.options[s] = new Option(m, n.options[s].value), a == s && (n.options[s].selected = !0)
            }
        } else {
            0 < r.length ? (document.getElementById("ucresult").innerHTML = "Please provide a valid number!", document.getElementById("ucresult").style.color = "red") : document.getElementById("ucresult").innerHTML = "", document.getElementById("ucShuttles").value = "";
            for (var s = 0; s < n.options.length; s++) {
                var m = "";
                m = 2 < (p = ucParseSelectValue(n.options[s].value)).length ? p[0] + " [" + p[1] + "]" : p[0], n.options[s] = new Option(m, n.options[s].value), a == s && (n.options[s].selected = !0)
            }
        }
    }
}

function convertFIToFra(r, e) {
    var n = r;
    "foot" == e && (n = 12 * r);
    var t = Math.floor(n / 12),
        c = Math.floor(n - 12 * t),
        a = n - Math.floor(n),
        n = Math.floor(n),
        e = Math.round(64 * a),
        r = 64;
    if (64 == e ? (n += 1, 12 == (c += 1) && (c = 0, t += 1), e = 0) : e % 32 == 0 ? (e /= 32, r = 2) : e % 16 == 0 ? (e /= 16, r = 4) : e % 8 == 0 ? (e /= 8, r = 8) : e % 4 == 0 ? (e /= 4, r = 16) : e % 2 == 0 && (e /= 2, r = 32), n + e < 1) return "";
    a = "<br>OR<br>";
    return 0 < t && (a += 1 < t ? t + " feet " : t + " foot ", 0 < c ? a += 0 < e ? c + " <sup>" + e + "</sup>/<sub>" + r + "</sub> inches " : 1 < c ? c + " inches " : c + " inch " : 0 < e && (a += " <sup>" + e + "</sup>/<sub>" + r + "</sub> inch "), a += "<br>OR<br>"), 0 < n ? a += 0 < e ? n + " <sup>" + e + "</sup>/<sub>" + r + "</sub> inches " : 1 < n ? n + " inches " : n + " inch " : 0 < e && (a += " <sup>" + e + "</sup>/<sub>" + r + "</sub> inch "), a
}

function toNearest(num, frac) {
    return Math.ceil(num / frac) * frac;
}

function ucDCUpdateResult(r) {
    processingType = r;
    var nCourts = cleanNumberInput(document.getElementById("ucCourts").value);
    var nShuttles = cleanNumberInput(document.getElementById("ucShuttles").value);
    var nPlayers = cleanNumberInput(document.getElementById("ucPlayers").value);
    var nCostPerCourt = document.getElementById("ucCostPerCourt").getAttribute("value");
    var nCostPerShuttle = document.getElementById("ucCostPerShuttle").getAttribute("value");
    var nHours = 2.0;
    var nCostPerPlayer = 0;


    if (nCourts == "" || nShuttles == "" || nPlayers == "") {

        document.getElementById("ucresult").innerHTML = ""
        return
    }


    nCostPerPlayer = ((nCostPerCourt * nCourts * nHours) + (nShuttles * nCostPerShuttle)) / nPlayers + 0.5;
    console.log("((%d * %d * %d) + (%d * %d)) / %d = $%d", nCostPerCourt, nCourts, nHours, nShuttles, nCostPerShuttle, nPlayers, nCostPerPlayer.toFixed(2))

    nCostPerPlayer = toNearest(nCostPerPlayer, 0.25).toFixed(2)

    document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + "$" + nCostPerPlayer;
    document.getElementById("ucresult").style.color = "black";

}

function ucDCUpdateResult2(r) {
    processingType = r;
    var e = cleanNumberInput(document.getElementById("ucCourts").value),
        n = document.getElementById("ucCostPerCourt"),
        t = document.getElementById("ucCostPerCourt"),
        c = document.getElementById("ucShuttles");

    1 == r && (e = cleanNumberInput(document.getElementById("ucShuttles").value), n = document.getElementById("ucCostPerCourt"), t = document.getElementById("ucCostPerCourt"), c = document.getElementById("ucCourts"));

    var a, s, o, i, r = n.value,
        n = t.value;

    1 == noValidation ?
        (e = trimAll((e + "").toUpperCase()), s = ucParseSelectValue(r), o = ucParseSelectValue(n), tempBaseNum = parseInt(s[1].substr(2).replace("]", "")), a = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", tempRegStr = "", tempRegStr = 10 < tempBaseNum ? "^[0-9A-" + a.substr(tempBaseNum, 1) + "]+$" : "^[0-" + a.substr(tempBaseNum, 1) + "]+$", new RegExp(tempRegStr).test(e) ?

            (i = ucCalculateResultNumOnly(e, s[i = 1], o[1]), 0 < o[1].indexOf(":") && "3" == o[1].split(":")[0] || (i = gnumberFormat(i)), c.value = i, document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + e + " " + s[0] + " = " + i + " " + o[0], document.getElementById("ucresult").style.color = "black") :

            (0 < e.length ?

                (document.getElementById("ucresult").innerHTML = "Please provide a valid number!", document.getElementById("ucresult").style.color = "red") :

                document.getElementById("ucresult").innerHTML = "", c.value = "")) : (t = e.indexOf("/"), a = e, 0 < t && (2 == (t = e.split("/")).length && isNumber(t[0]) && (isNumber(t[1]) ? e = parseFloat(t[0]) / parseFloat(t[1]) : (e = t[0], a = t[0]), e += "")), isNumber(e) ? (s = ucParseSelectValue(r), o = ucParseSelectValue(n), i = 1, n = "", 2 < s.length ? 2 < o.length ? (i = ucCalculateResultNumOnly(e, s[2], o[2]), "foot" != o[0] && "inch" != o[0] || (n = convertFIToFra(i, o[0]))) : i = ucCalculateResultNumOnly(e, s[2], o[1]) : 2 < o.length ? (i = ucCalculateResultNumOnly(e, s[1], o[2]), "foot" != o[0] && "inch" != o[0] || (n = convertFIToFra(i, o[0]))) : i = ucCalculateResultNumOnly(e, s[1], o[1]), i = gnumberFormat(i), c.value = i,

            document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + a + " " + s[0] + " = " + i + " " + o[0] + n, document.getElementById("ucresult").style.color = "black") : (0 < e.length ? (document.getElementById("ucresult").innerHTML = "Please provide a valid number!", document.getElementById("ucresult").style.color = "red") : document.getElementById("ucresult").innerHTML = "", c.value = ""))
}

var rightNavMain = new Array("Common Converters", "Engineering Converters", "Heat Converters", "Fluids Converters", "Light Converters", "Electricity Converters", "Magnetism Converters", "Radiology Converters"),
    rightNavSub = new Array;

function showNav(r) {
    var e = "";
    for (i = 0; i < rightNavMain.length; i++)
        if (e += '<a href="#" onClick="return showNav(\'' + rightNavMain[i] + "')\"", r == rightNavMain[i] && (e += " style=\"background-color: #eee;color:#006633;background-image: url('/images/down-arrow.svg');background-repeat: no-repeat;background-position: right 6px center;\""), e += ">" + rightNavMain[i] + "</a>", r == rightNavMain[i]) {
            for (e += '<div id="ocsubnav">', j = 0; j < rightNavSub[i].length; j++) e += rightNavSub[i][j];
            e += "</div>"
        }
    return e = '<div id="octitle">All Converters</div><div id="occontent">' + e + '<a href="/common-unit-systems.php">Common Unit Systems</a></div>', document.getElementById("othercalc") && (document.getElementById("othercalc").innerHTML = e), !1
}
rightNavSub[0] = new Array("<a href='/length-converter.html'>Length</a>", "<a href='/weight-and-mass-converter.html'>Weight and Mass</a>", "<a href='/volume-converter.html'>Volume</a>", "<a href='/temperature-converter.html'>Temperature</a>", "<a href='/area-converter.html'>Area</a>", "<a href='/pressure-converter.html'>Pressure</a>", "<a href='/energy-converter.html'>Energy</a>", "<a href='/power-converter.html'>Power</a>", "<a href='/force-converter.html'>Force</a>", "<a href='/time-converter.html'>Time</a>", "<a href='/speed-converter.html'>Speed</a>", "<a href='/angle-converter.html'>Angle</a>", "<a href='/fuel-consumption-converter.html'>Fuel Consumption</a>", "<a href='/numbers-converter.html'>Numbers</a>", "<a href='/data-storage-converter.html'>Data Storage</a>", "<a href='/volume-dry-converter.html'>Volume - Dry</a>", "<a href='/currency-converter.html'>Currency</a>", "<a href='/case-converter.html'>Case</a>"), rightNavSub[1] = new Array("<a href='/volume-converter.html'>Volume</a>", "<a href='/temperature-converter.html'>Temperature</a>", "<a href='/area-converter.html'>Area</a>", "<a href='/pressure-converter.html'>Pressure</a>", "<a href='/energy-converter.html'>Energy</a>", "<a href='/power-converter.html'>Power</a>", "<a href='/force-converter.html'>Force</a>", "<a href='/time-converter.html'>Time</a>", "<a href='/speed-converter.html'>Speed</a>", "<a href='/angle-converter.html'>Angle</a>", "<a href='/fuel-consumption-converter.html'>Fuel Consumption</a>", "<a href='/numbers-converter.html'>Numbers</a>", "<a href='/data-storage-converter.html'>Data Storage</a>", "<a href='/volume-dry-converter.html'>Volume - Dry</a>", "<a href='/currency-converter.html'>Currency</a>", "<a href='/velocity-angular-converter.html'>Velocity - Angular</a>", "<a href='/acceleration-converter.html'>Acceleration</a>", "<a href='/acceleration-angular-converter.html'>Acceleration - Angular</a>", "<a href='/density-converter.html'>Density</a>", "<a href='/specific-volume-converter.html'>Specific Volume</a>", "<a href='/moment-of-inertia-converter.html'>Moment of Inertia</a>", "<a href='/moment-of-force-converter.html'>Moment of Force</a>", "<a href='/torque-converter.html'>Torque</a>"), rightNavSub[2] = new Array("<a href='/fuel-efficiency-mass-converter.html'>Fuel Efficiency - Mass</a>", "<a href='/fuel-efficiency-volume-converter.html'>Fuel Efficiency - Volume</a>", "<a href='/temperature-interval-converter.html'>Temperature Interval</a>", "<a href='/thermal-expansion-converter.html'>Thermal Expansion</a>", "<a href='/thermal-resistance-converter.html'>Thermal Resistance</a>", "<a href='/thermal-conductivity-converter.html'>Thermal Conductivity</a>", "<a href='/specific-heat-capacity-converter.html'>Specific Heat Capacity</a>", "<a href='/heat-density-converter.html'>Heat Density</a>", "<a href='/heat-flux-density-converter.html'>Heat Flux Density</a>", "<a href='/heat-transfer-coefficient-converter.html'>Heat Transfer Coefficient</a>"), rightNavSub[3] = new Array("<a href='/flow-converter.html'>Flow</a>", "<a href='/flow-mass-converter.html'>Flow - Mass</a>", "<a href='/flow-molar-converter.html'>Flow - Molar</a>", "<a href='/mass-flux-density-converter.html'>Mass Flux Density</a>", "<a href='/concentration-molar-converter.html'>Concentration - Molar</a>", "<a href='/concentration-solution-converter.html'>Concentration - Solution</a>", "<a href='/viscosity-dynamic-converter.html'>Viscosity - Dynamic</a>", "<a href='/viscosity-kinematic-converter.html'>Viscosity - Kinematic</a>", "<a href='/surface-tension-converter.html'>Surface Tension</a>", "<a href='/permeability-converter.html'>Permeability</a>"), rightNavSub[4] = new Array("<a href='/luminance-converter.html'>Luminance</a>", "<a href='/luminous-intensity-converter.html'>Luminous Intensity</a>", "<a href='/illumination-converter.html'>Illumination</a>", "<a href='/digital-image-resolution-converter.html'>Digital Image Resolution</a>", "<a href='/frequency-wavelength-converter.html'>Frequency Wavelength</a>"), rightNavSub[5] = new Array("<a href='/charge-converter.html'>Charge</a>", "<a href='/linear-charge-density-converter.html'>Linear Charge Density</a>", "<a href='/surface-charge-density-converter.html'>Surface Charge Density</a>", "<a href='/volume-charge-density-converter.html'>Volume Charge Density</a>", "<a href='/current-converter.html'>Current</a>", "<a href='/linear-current-density-converter.html'>Linear Current Density</a>", "<a href='/surface-current-density-converter.html'>Surface Current Density</a>", "<a href='/electric-field-strength-converter.html'>Electric Field Strength</a>", "<a href='/electric-potential-converter.html'>Electric Potential</a>", "<a href='/electric-resistance-converter.html'>Electric Resistance</a>", "<a href='/electric-resistivity-converter.html'>Electric Resistivity</a>", "<a href='/electric-conductance-converter.html'>Electric Conductance</a>", "<a href='/electric-conductivity-converter.html'>Electric Conductivity</a>", "<a href='/electrostatic-capacitance-converter.html'>Electrostatic Capacitance</a>", "<a href='/inductance-converter.html'>Inductance</a>"), rightNavSub[6] = new Array("<a href='/magnetomotive-force-converter.html'>Magnetomotive Force</a>", "<a href='/magnetic-field-strength-converter.html'>Magnetic Field Strength</a>", "<a href='/magnetic-flux-converter.html'>Magnetic Flux</a>", "<a href='/magnetic-flux-density-converter.html'>Magnetic Flux Density</a>"), rightNavSub[7] = new Array("<a href='/radiation-converter.html'>Radiation</a>", "<a href='/radiation-activity-converter.html'>Radiation-Activity</a>", "<a href='/radiation-exposure-converter.html'>Radiation-Exposure</a>", "<a href='/radiation-absorbed-dose-converter.html'>Radiation-Absorbed Dose</a>"), setTimeout(function() { "undefined" != typeof navSectionName ? showNav(navSectionName) : showNav("") }, 100);
var cnCInputs = [0],
    cnHistory = [],
    cnHistoryShow = 3,
    cnDegreeRadians = "degree",
    cnAccuracy = 12,
    cnNew = !0,
    cnMemoryV = 0,
    cnScreenV = 0,
    cnPrevAns = 0;

function r(r) {
    var e, n;
    cnCInputs.length < 2 && cnNew && "1/x" != r && "x3" != r && "x2" != r && "apow" != r && "pow" != r && "*" != r && "/" != r && "+" != r && "-" != r && "neg" != cnCInputs[0] && (cnCInputs = [0]), "-" == r && cnCInputs.length < 2 && 0 == cnCInputs[0] && (cnCInputs[0] = "neg"), "MR" != r && (document.getElementById("scimrc").innerHTML = "MR"), "M+" == r ? "Error" == cnScreenV || isNaN(cnScreenV) || (cnMemoryV += parseFloat(cnScreenV + "")) : "M-" == r ? "Error" == cnScreenV || isNaN(cnScreenV) || (cnMemoryV -= parseFloat(cnScreenV + "")) : "MR" == r ? "MC" == document.getElementById("scimrc").innerHTML ? (cnMemoryV = 0, document.getElementById("scimrc").innerHTML = "MR") : (1 < cnCInputs.length ? "pi" != (e = cnCInputs[cnCInputs.length - 1]) && "e" != e && "." != e && isNaN(e) ? cnCInputs.push(cnMemoryV) : 0 != cnMemoryV && (cnCInputs.push("*"), cnCInputs.push(cnMemoryV)) : cnCInputs = [cnMemoryV], cnScreenV = cnCalcFinal(0), document.getElementById("scimrc").innerHTML = "MC") : "ans" == r ? document.getElementById("ucCourts") ? (document.getElementById("ucCourts").value = cnScreenV, document.getElementById("uctable") ? ucUpdateResult() : document.getElementById("undctable") && ucDCUpdateResult(0)) : document.getElementById("fromVal") && (document.getElementById("fromVal").value = cnScreenV, calcul()) : "=" == r ? (1 < cnCInputs.length && ("Error" == (cnScreenV = cnCalcFinal(1)) || isNaN(cnScreenV) ? cnCInputs = [0] : (cnCInputs = [cnScreenV], cnPrevAns = cnScreenV)), cnNew = !0) : cnScreenV = "C" == r ? (cnCInputs = [0], document.getElementById("sciOutPut").innerHTML = "0", document.getElementById("sciInPut").innerHTML = "&nbsp;", cnNew = !0, 0) : ("bk" == r ? (cnCInputs.splice(cnCInputs.length - 1, 1), 0 == cnCInputs.length && (cnCInputs = [0])) : ("RND" == r ? (r = Math.random() + "", cnCInputs.length < 2 ? "neg" == cnCInputs[0] ? cnCInputs.push(r) : cnCInputs[0] = r : "+/-" != (n = cnCInputs[cnCInputs.length - 1]) && "." != n && isNaN(n) && cnCInputs.push(r), cnNew = !1) : cnCInputs.push(r), n = cnValidateInputs(), r = cnCInputs.length, 1 == n ? cnCInputs.splice(r - 1, 1) : -1 == n && cnCInputs.splice(r - 2, 1)), cnCalcFinal(0))
}

function cnCalcFinal(r) {
    var e = cnCombineNumbers(),
        n = [],
        t = [],
        c = 0;
    for (i = 0; i < e.length; i++) A = e[i], B = e[i - 1], isNaN(A) && "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "ex" != A && "10x" != A && "ln" != A && "log" != A && "3x" != A && "sqrt" != A && "(" != A && "pi" != A && "e" != A || isNaN(B) && "1/x" != B && "pc" != B && "n!" != B && "x3" != B && "x2" != B && ")" != B && "pi" != B && "e" != B || (t.push("*"), n.push("*")), "sin" == A || "cos" == A || "tan" == A || "asin" == A || "acos" == A || "atan" == A || "ln" == A || "log" == A || "3x" == A || "sqrt" == A ? (t.push(A), t.push("("), n.push(A), n.push("("), c++) : ("(" == A && c++, ")" == A && c--, t.push(A), n.push(A));
    if (0 < c)
        for (i = 0; i < c; i++) n.push("<b>)</b>"), t.push(")");
    2 < t.length && "0" == t[0] + "" && "*" == t[1] && (A = t[2], "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "ex" != A && "10x" != A && "ln" != A && "log" != A && "(" != A && "pi" != A && "e" != A && "3x" != A && "sqrt" != A || (t = t.slice(2), n = n.slice(2)));
    for (var a = n, s = [], o = 0, l = 0; - 1 < a.indexOf(")") || -1 < a.indexOf("<b>)</b>");) {
        o = a.indexOf(")");
        var u = a.indexOf("<b>)</b>");
        (!(-1 < o) || -1 < u && u < o) && (o = u), s = a.slice(0, o + 1), a = cnArrayProc(a, l = s.lastIndexOf("("), o + 1, cnFormatDisplay(s = s.slice(l)))
    }
    for (var p = "&nbsp;" + cnFormatDisplay(a), a = t, s = [], o = 0, l = 0; - 1 < a.indexOf(")");) o = a.indexOf(")"), s = a.slice(0, o + 1), a = cnArrayProc(a, l = s.lastIndexOf("("), o + 1, cnCalcResult(s = s.slice(l)));
    var m = cnCalcResult(a);
    return isNaN(m) && (m = 1 != r ? "" : "Error"), document.getElementById("sciOutPut").innerHTML = "&nbsp;" + cnFmt(m), 1 == r && (p = p.replace(/<b>/g, "").replace(/<\/b>/g, ""), 1 < e.length && (cnHistory.push([p, cnFmt(m)]), cnHistory.length > cnHistoryShow && cnHistory.splice(0, 1)), p += " ="), document.getElementById("sciInPut").innerHTML = p, m
}

function cnFormatDisplay(r) {
    for (var e = r; - 1 < e.indexOf("EXP");) var n = e.indexOf("EXP"),
        e = "neg" == e[n + 1] ? cnArrayProc(e, n, n + 2, " &#215; 10<sup>-</sup>") : isNaN(e[n + 1]) ? cnArrayProc(e, n, n + 1, " &#215; 10<sup><b>&#9634;</b></sup>") : cnArrayProc(e, n, n + 2, " &#215; 10<sup>" + e[n + 1] + "</sup>");
    for (a = 0; a < e.length;) A = e[a], "pi" == A ? e[a] = "&pi;" : "e" == A ? e[a] = "e" : "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "3x" != A && "sqrt" != A && "ln" != A && "log" != A || ("asin" == A ? e[a] = "arcsin" : "acos" == A ? e[a] = "arccos" : "atan" == A ? e[a] = "arctan" : "3x" == A ? e[a] = "<sup>3</sup>&#8730;" : "sqrt" == A && (e[a] = "&#8730;"), e[a] = e[a] + e[a + 1], e.splice(a + 1, 1)), a++;
    for (var t, c = e.length, a = 0; a < c;) A = e[a], "pc" == A ? (e[a - 1] = e[a - 1] + "%", e.splice(a, 1), c--) : "n!" == A ? (!isNaN(e[a - 1]) && e[a - 1] < 0 ? e[a - 1] = "(" + e[a - 1] + ")!" : e[a - 1] = e[a - 1] + "!", e.splice(a, 1), c--) : "x3" == A ? (6 < (t = e[a - 1] + "").length && (t = t.substr(t.length - 6)), "</sup>" == t || "-" == (e[a - 1] + "").substring(0, 1) ? e[a - 1] = "(" + e[a - 1] + ")<sup>3</sup>" : e[a - 1] = e[a - 1] + "<sup>3</sup>", e.splice(a, 1), c--) : "x2" == A ? (6 < (t = e[a - 1] + "").length && (t = t.substr(t.length - 6)), "</sup>" == t || "-" == (e[a - 1] + "").substring(0, 1) ? e[a - 1] = "(" + e[a - 1] + ")<sup>2</sup>" : e[a - 1] = e[a - 1] + "<sup>2</sup>", e.splice(a, 1), c--) : "1/x" == A ? (e[a - 1] = "(1/" + e[a - 1] + ")", e.splice(a, 1), c--) : a++;
    for (; - 1 < e.lastIndexOf("pow") || -1 < e.lastIndexOf("apow") || -1 < e.lastIndexOf("ex") || -1 < e.lastIndexOf("10x");) {
        var s, o, n = e.lastIndexOf("pow"),
            i = e.lastIndexOf("apow");
        n < i && (n = i), n < (i = e.lastIndexOf("ex")) && (n = i), n < (i = e.lastIndexOf("10x")) && (n = i), "pow" == e[n] ? (o = "", "neg" == e[n + 1] && (o = "-", e.splice(n + 1, 1)), i = s = "", "-" == (e[n - 1] + "").substring(0, 1) && (s = "(", i = ")"), e[n + 1] && "" != e[n + 1] && ")" != e[n + 1] && "<b>)</b>" != e[n + 1] ? (e[n - 1] = s + e[n - 1] + i + "<sup>" + o + e[n + 1] + "</sup>", e.splice(n, 2)) : (e[n - 1] = "-" == o ? s + e[n - 1] + i + "<sup>-</sup>" : s + e[n - 1] + i + "<sup><b>&#9634;</b></sup>", e.splice(n, 1))) : "apow" == e[n] ? (o = "", "neg" == e[n + 1] && (o = "-", e.splice(n + 1, 1)), e[n + 1] && "" != e[n + 1] && ")" != e[n + 1] && "<b>)</b>" != e[n + 1] ? (e[n - 1] = "<sup>" + o + e[n + 1] + "</sup>&#8730;" + e[n - 1], e.splice(n, 2)) : (e[n - 1] = "-" == o ? "<sup>-</sup>&#8730;" + e[n - 1] : "<sup><b>&#9634;</b></sup>&#8730;" + e[n - 1], e.splice(n, 1))) : "ex" == e[n] ? (o = "", "neg" == e[n + 1] && (o = "-", e.splice(n + 1, 1)), e[n + 1] && "" != e[n + 1] && ")" != e[n + 1] && "<b>)</b>" != e[n + 1] ? (e[n] = "e<sup>" + o + e[n + 1] + "</sup>", e.splice(n + 1, 1)) : e[n] = "-" == o ? "e<sup>-</sup>" : "e<sup><b>&#9634;</b></sup>") : "10x" == e[n] && (o = "", "neg" == e[n + 1] && (o = "-", e.splice(n + 1, 1)), e[n + 1] && "" != e[n + 1] && ")" != e[n + 1] && "<b>)</b>" != e[n + 1] ? (e[n] = "10<sup>" + o + e[n + 1] + "</sup>", e.splice(n + 1, 1)) : e[n] = "-" == o ? "10<sup>-</sup>" : "10<sup><b>&#9634;</b></sup>")
    }
    for (var l = "", a = 0; a < e.length; a++) A = e[a], isNaN(A) ? "*" == A ? l += " &#215; " : "/" == A ? l += " &#247; " : "+" == A ? l += " + " : "-" == A ? l += " &minus; " : "neg" == A ? l += " -" : l += A : l += A;
    return l
}

function cnCalcResult(crInArray) {
    var crProcArray = crInArray,
        tempV, tempV, tempV, tempV, tempV, tempV;
    if (-1 < crProcArray.indexOf("Error")) return "Error";
    for (; - 1 < crProcArray.indexOf("EXP");) {
        var crFDTemp = crProcArray.indexOf("EXP");
        if (isNaN(crProcArray[crFDTemp + 1])) return "Error";
        crProcArray[crFDTemp - 1] = crProcArray[crFDTemp - 1] * Math.pow(10, crProcArray[crFDTemp + 1]), crProcArray.splice(crFDTemp, 2)
    }
    for (i = 0; i < crProcArray.length; i++) "pi" == crProcArray[i] && (crProcArray[i] = Math.PI), "e" == crProcArray[i] && (crProcArray[i] = Math.E), "(" == crProcArray[i] && (crProcArray.splice(i, 1), i--), ")" == crProcArray[i] && (crProcArray.splice(i, 1), i--);
    for (i = 0; i < crProcArray.length; i++)
        if (A = crProcArray[i], "sin" == A || "cos" == A || "tan" == A || "asin" == A || "acos" == A || "atan" == A || "ln" == A || "log" == A || "3x" == A || "sqrt" == A) { if (!(i + 1 < crProcArray.length)) return "Error"; if (B = crProcArray[i + 1], isNaN(B)) return "Error"; "sin" == A ? "degree" == cnDegreeRadians ? (tempV = Math.abs(B % 180), crProcArray[i] = tempV < 1e-13 ? 0 : Math.sin(B / 180 * Math.PI)) : (tempV = Math.abs(B / Math.PI - Math.floor(B / Math.PI)) * Math.PI, crProcArray[i] = tempV < 1e-13 ? 0 : Math.sin(B)) : "cos" == A ? "degree" == cnDegreeRadians ? (tempV = Math.abs(B % 180), Math.abs(tempV - 90) < 1e-13 ? crProcArray[i] = 0 : crProcArray[i] = Math.cos(B / 180 * Math.PI)) : (tempV = Math.abs(B / Math.PI - Math.floor(B / Math.PI)) * Math.PI, Math.abs(tempV - Math.PI / 2) < 1e-13 ? crProcArray[i] = 0 : crProcArray[i] = Math.cos(B)) : "tan" == A ? "degree" == cnDegreeRadians ? (tempV = Math.abs(B % 180), tempV < 1e-13 ? crProcArray[i] = 0 : Math.abs(tempV - 90) < 1e-13 ? crProcArray[i] = "Error" : crProcArray[i] = Math.tan(B / 180 * Math.PI)) : (tempV = Math.abs(B / Math.PI - Math.floor(B / Math.PI)) * Math.PI, tempV < 1e-13 ? crProcArray[i] = 0 : Math.abs(tempV - Math.PI / 2) < 1e-13 ? crProcArray[i] = "Error" : crProcArray[i] = Math.tan(B)) : "asin" == A ? crProcArray[i] = "degree" == cnDegreeRadians ? 180 * Math.asin(B) / Math.PI : Math.asin(B) : "acos" == A ? crProcArray[i] = "degree" == cnDegreeRadians ? 180 * Math.acos(B) / Math.PI : Math.acos(B) : "atan" == A ? crProcArray[i] = "degree" == cnDegreeRadians ? 180 * Math.atan(B) / Math.PI : Math.atan(B) : "ln" == A ? crProcArray[i] = Math.log(B) : "log" == A ? crProcArray[i] = Math.log(B) / Math.LN10 : "3x" == A ? B < 0 ? crProcArray[i] = -1 * Math.pow(-1 * B, 1 / 3) : crProcArray[i] = Math.pow(B, 1 / 3) : "sqrt" == A && (crProcArray[i] = Math.sqrt(B)), crProcArray.splice(i + 1, 1) }
    for (; - 1 < crProcArray.indexOf("1/x") || -1 < crProcArray.indexOf("pc") || -1 < crProcArray.indexOf("n!") || -1 < crProcArray.indexOf("x3") || -1 < crProcArray.indexOf("x2");) {
        var j = crProcArray.indexOf("1/x");
        j < 0 && (j = 1e8);
        var k = crProcArray.indexOf("pc"); - 1 < k && k < j && (j = k), k = crProcArray.indexOf("n!"), -1 < k && k < j && (j = k), k = crProcArray.indexOf("x3"), -1 < k && k < j && (j = k), k = crProcArray.indexOf("x2"), -1 < k && k < j && (j = k), "1/x" == crProcArray[j] ? (crProcArray[j - 1] = 1 / crProcArray[j - 1], crProcArray.splice(j, 1)) : "pc" == crProcArray[j] ? (crProcArray[j - 1] = .01 * crProcArray[j - 1], crProcArray.splice(j, 1)) : "n!" == crProcArray[j] ? (crProcArray[j - 1] = cnFactorial(crProcArray[j - 1]), crProcArray.splice(j, 1)) : "x3" == crProcArray[j] ? (crProcArray[j - 1] = crProcArray[j - 1] * crProcArray[j - 1] * crProcArray[j - 1], crProcArray.splice(j, 1)) : "x2" == crProcArray[j] && (crProcArray[j - 1] = crProcArray[j - 1] * crProcArray[j - 1], crProcArray.splice(j, 1))
    }
    if (isNaN(crProcArray[crProcArray.length - 1])) return "Error";
    for (; - 1 < crProcArray.lastIndexOf("pow") || -1 < crProcArray.lastIndexOf("apow") || -1 < crProcArray.lastIndexOf("ex") || -1 < crProcArray.indexOf("10x");) {
        var j = crProcArray.lastIndexOf("pow"),
            k = crProcArray.lastIndexOf("apow");
        if (j < k && (j = k), k = crProcArray.lastIndexOf("ex"), j < k && (j = k), k = crProcArray.lastIndexOf("10x"), j < k && (j = k), "10x" == crProcArray[j]) "neg" == crProcArray[j + 1] ? (crProcArray[j] = Math.pow(10, -1 * crProcArray[j + 2]), crProcArray.splice(j + 1, 2)) : (crProcArray[j] = Math.pow(10, crProcArray[j + 1]), crProcArray.splice(j + 1, 1));
        else if ("ex" == crProcArray[j]) "neg" == crProcArray[j + 1] ? (crProcArray[j] = Math.pow(Math.E, -1 * crProcArray[j + 2]), crProcArray.splice(j + 1, 2)) : (crProcArray[j] = Math.pow(Math.E, crProcArray[j + 1]), crProcArray.splice(j + 1, 1));
        else if ("pow" == crProcArray[j]) "neg" == crProcArray[j + 1] ? (alert(crProcArray[j - 1] + " / " + crProcArray[j] + " / " + crProcArray[j + 1] + " / " + crProcArray[j + 2] + " / "), crProcArray[j - 1] = Math.pow(crProcArray[j - 1], -1 * crProcArray[j + 2]), alert(crProcArray[j - 1]), crProcArray.splice(j, 3)) : (crProcArray[j - 1] = Math.pow(crProcArray[j - 1], crProcArray[j + 1]), crProcArray.splice(j, 2));
        else if ("apow" == crProcArray[j])
            if ("neg" == crProcArray[j + 1]) {
                if (crProcArray[j + 2] - Math.round(crProcArray[j + 2]) == 0)
                    if (crProcArray[j - 1] < 0) {
                        if (crProcArray[j + 2] % 2 == 0) return "Error";
                        crProcArray[j - 1] = -1 * Math.pow(-1 * crProcArray[j - 1], 1 / crProcArray[j + 2])
                    } else crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 2]);
                else crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 2]);
                crProcArray.splice(j, 3)
            } else {
                if (crProcArray[j + 1] - Math.round(crProcArray[j + 1]) == 0)
                    if (crProcArray[j - 1] < 0) {
                        if (crProcArray[j + 1] % 2 == 0) return "Error";
                        crProcArray[j - 1] = -1 * Math.pow(-1 * crProcArray[j - 1], 1 / crProcArray[j + 1])
                    } else crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 1]);
                else crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 1]);
                crProcArray.splice(j, 2)
            }
    }
    for (i = 1; i < crProcArray.length; i++) A = crProcArray[i], B = crProcArray[i - 1], "neg" != B || isNaN(A) || (crProcArray[i] = -1 * A, crProcArray.splice(i - 1, 1));
    if (crProcArray.length < 2) return crProcArray[0];
    var crDFOut = "";
    for (i = 0; i < crProcArray.length; i++) isNaN(crProcArray[i]) ? "neg" == crProcArray[i] ? crDFOut += "-" : crDFOut += crProcArray[i] : crDFOut += "(" + crProcArray[i] + ")";
    try { return eval(crDFOut) } catch (e) { return "Error" }
}

function cnFactorial(r) { var e = Math.round(r); if (Math.abs(e - r) < 1e-11) { if (e < 0 || 200 < e) return "Error"; var n = 1; for (i = 1; i <= e; ++i) n *= i; return n } return cnFactorialD(parseFloat(r)) }

function cnFactorialD(r) { if (r < -1) return Math.PI / (Math.sin(Math.PI * (r + 1)) * cnFactorialD(-1 - r)); for (var e = [57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, .0001580887032249125, -.00021026444172410488, .00021743961811521265, -.0001643181065367639, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22], n = .9999999999999971, t = 0; t < 14; t++) n += e[t] / (r + t + 2); return Math.exp((r + 1.5) * Math.log(r + 6.2421875) - r - 6.2421875 + Math.log(2.5066282746310007 * n / (r + 1))) }

function cnValidateInputs() {
    var r = cnCombineNumbers();
    for (i = 0; i < r.length; i++)
        if (A = r[i] + " ", B = r[i - 1] + " ", -1 < A.indexOf(".")) { if (-1 < B.indexOf(".")) return 1; if (A = A.substring(A.indexOf(".") + 1), -1 < A.indexOf(".")) return 1 }
    for (i = 0; i < r.length; i++) { if (A = r[i], B = r[i - 1], C = r[i - 2], !("+" != A && "-" != A && "*" != A && "/" != A || "+" != B && "-" != B && "*" != B && "/" != B)) return 1; if (("1/x" == A || "pc" == A || "n!" == A || "x3" == A || "x2" == A || ")" == A || "apow" == A || "pow" == A || "*" == A || "/" == A || "+" == A || "-" == A || "EXP" == A || "+/-" == A) && "neg" == B) return 1; if ("neg" == B && (B = C), "(" == B && ("+" == A || "-" == A || "*" == A || "/" == A || ")" == A || "pc" == A || "n!" == A || "+/-" == A || "EXP" == A || "pow" == A || "apow" == A || "1/x" == A || "x3" == A || "x2" == A)) return 1; if (")" == A && ("+" == B || "-" == B || "*" == B || "/" == B || "sin" == B || "cos" == B || "tan" == B || "asin" == B || "acos" == B || "atan" == B || "pow" == B || "ex" == B || "10x" == B || "apow" == B || "3x" == B || "sqrt" == B || "ln" == B || "log" == B || "(" == B || "EXP" == B)) return 1; if ("EXP" == A && isNaN(B)) return 1; if ("EXP" == B && "neg" != A) { if (isNaN(A)) return 1; if (-1 < A.indexOf(".")) return 1 } if (!("x3" != A && "x2" != A && "apow" != A && "pow" != A || "sin" != B && "cos" != B && "tan" != B && "asin" != B && "acos" != B && "atan" != B && "ex" != B && "10x" != B && "ln" != B && "log" != B && "3x" != B && "sqrt" != B && "(" != B && "*" != B && "/" != B && "+" != B && "-" != B)) return 1; if (!("x3" != A && "x2" != A && "apow" != A && "pow" != A || "apow" != B && "pow" != B)) return 1; if (!("sin" != B && "cos" != B && "tan" != B && "asin" != B && "acos" != B && "atan" != B && "ex" != B && "10x" != B && "ln" != B && "log" != B && "3x" != B && "sqrt" != B && "(" != B && "apow" != B && "pow" != B && "EXP" != B && "*" != B && "/" != B && "+" != B && "-" != B || "1/x" != A && "pc" != A && "n!" != A && "x3" != A && "x2" != A && ")" != A && "apow" != A && "pow" != A && "*" != A && "/" != A && "+" != A && "-" != A && "EXP" != A)) return 1 }
    var e = 0,
        n = 0;
    for (i = 0; i < r.length; i++)
        if (A = r[i], B = r[i - 1], ")" == A && n++, "sin" != B && "cos" != B && "tan" != B && "asin" != B && "acos" != B && "atan" != B && "ln" != B && "log" != B && "3x" != B && "sqrt" != B && "(" != B || e++, e < n) return 1;
    return 0
}

function cnRemoveZero(r) { for (cnRZOut = r + ""; 1 < cnRZOut.length && "0" == cnRZOut.substring(0, 1) && "." != cnRZOut.substring(1, 2);) cnRZOut = cnRZOut.substring(1); return cnRZOut }

function cnCombineNumbers() {
    for (i = 1; i < cnCInputs.length; i++) "-" == cnCInputs[i] && (A = cnCInputs[i - 1], "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "ex" != A && "10x" != A && "ln" != A && "log" != A && "(" != A && "apow" != A && "pow" != A && "*" != A && "/" != A && "+" != A && "-" != A && "EXP" != A && "3x" != A && "sqrt" != A || (cnCInputs[i] = "neg")), "+/-" == cnCInputs[i] && (A = cnCInputs[i - 1], "+/-" != A && "." != A && 1 != A && 2 != A && 3 != A && 4 != A && 5 != A && 6 != A && 7 != A && 8 != A && 9 != A && 0 != A && cnCInputs.splice(i, 1));
    var r = [],
        e = "";
    for (i = 0; i < cnCInputs.length; i++) A = cnCInputs[i], "+/-" == A || "." == A || 1 == A || 2 == A || 3 == A || 4 == A || 5 == A || 6 == A || 7 == A || 8 == A || 9 == A || 0 == A ? "." == A && "" == e ? e = "0." : e += A : "" == A || ("" != e && r.push(cnRemoveZero(e)), e = "", r.push(A));
    for ("" != e && r.push(cnRemoveZero(e)), e = "", i = 0; i < r.length; i++)
        if (A = r[i] + "", -1 < A.indexOf("+/-")) {
            for (C = 0, F = ""; - 1 < A.indexOf("+/-");) TP = A.indexOf("+/-"), F += A.substring(0, TP), A = A.substring(TP + 3), C++;
            F += A, C %= 2, 1 == C && 0 < F.length && (F = "-" == F.substring(0, 1) ? F.substring(1) : "-" + F), r[i] = F
        }
    for (i = 1; i < r.length; i++) A = r[i], B = r[i - 1], "neg" == B && (isNaN(A) || ("-" == A.substring(0, 1) ? r[i] = A.substring(1) : r[i] = "-" + A, r.splice(i - 1, 1), i--));
    return r
}

function cnArrayProc(r, e, n, t) { var c = []; return (c = r.slice(0, e)).push(t), c.concat(r.slice(n)) }

function cnFmt(r) {
    if (dd = (document.domain + "").toLowerCase(), "\x31\x39\x32\x2E\x31\x36\x38\x2E\x30\x2E\x31\x30\x39" != dd && dd.indexOf("\x75\x6E\x69\x74\x63\x6F\x6E\x76\x65\x72\x74\x65\x72\x73\x2E\x6E\x65\x74") < 0) cc = "a";
    else if ("undefined" == typeof cc) {
        var e = ("" + r).toLowerCase();
        if (isNaN(e)) return "Error ";
        if ("" == e) return "";
        if (0 <= e.indexOf("N") || r == 2 * r && r == 1 + r) return "Error ";
        if (0 <= (l = e.indexOf("e"))) {
            var n = parseInt(e.substring(l + 1, e.length)),
                e = parseFloat(e.substring(0, l));
            11 < l && (l = 11), 10 == (s = e < 0 ? parseFloat((e - 5e-12 + "").substring(0, l)) : parseFloat((e + 5e-12 + "").substring(0, l))) ? (s = 1, n++) : -10 == s && (s = -1, n++), e = s + " &#215;10<sup>" + n + "</sup>"
        } else {
            var t = !1;
            r < 0 && (r = -r, t = !0);
            var c = r - (o = Math.floor(r)),
                a = cnAccuracy - ("" + o).length - 1,
                n = "" == (n = " 1000000000000000000".substring(1, 2 + a) + "") || " " == n ? 1 : parseInt(n),
                s = Math.floor(c * n + .5),
                o = Math.floor(Math.floor(r * n + .5) / n);
            e = t ? "-" + o : "" + o;
            for (var i = "00000000000000" + s, l = (i = i.substring(i.length - a, i.length)).length - 1; 0 <= l && "0" == i.charAt(l);) --l;
            i = i.substring(0, l + 1), 0 <= l && (e += "." + i)
        }
        return e
    }
}
var uqcStatus = 0;

function quickCaclShow(r) {
    var e;
    document.getElementById("unquickcalc") && (0 == uqcStatus ? (e = '<table align="center" id="sciout" cellpadding="0" cellspacing="2"><tr><td', "m" != r && (e += ' colspan="2"'), e += '><div><img src="/images/close.svg" onClick="document.getElementById(\'unquickcalc\').style.display = \'none\';uqcStatus=0;" align="right" /><div id="sciInPut">&nbsp;</div><div id="sciOutPut">0</div></div></td></tr><tr>', "m" != r && (e += '<td id="qcscif"><div style="padding-top:3px;width:100%"><div><span onclick="r(\'sin\')" class="scifunc">sin</span><span onclick="r(\'cos\')" class="scifunc">cos</span><span onclick="r(\'tan\')" class="scifunc">tan</span><span class="scird"><label for="scirdsettingd"><input id="scirdsettingd" type="radio" name="scirdsetting" value="deg" onClick="cnDegreeRadians=\'degree\';" checked>Deg</label><label for="scirdsettingr"><input id="scirdsettingr" type="radio" name="scirdsetting" value="rad" onClick="cnDegreeRadians=\'radians\';">Rad</label></span></div><div><span onclick="r(\'asin\')" class="scifunc">sin<sup>-1</sup></span><span onclick="r(\'acos\')" class="scifunc">cos<sup>-1</sup></span><span onclick="r(\'atan\')" class="scifunc">tan<sup>-1</sup></span><span onclick="r(\'pi\')" class="scifunc">&#960;</span><span onclick="r(\'e\')" class="scifunc">e</span></div><div><span onclick="r(\'pow\')" class="scifunc">x<sup>y</sup></span><span onclick="r(\'x3\')" class="scifunc">x<sup>3</sup></span><span onclick="r(\'x2\')" class="scifunc">x<sup>2</sup></span><span onclick="r(\'ex\')" class="scifunc">e<sup>x</sup></span><span onclick="r(\'10x\')" class="scifunc">10<sup>x</sup></span></div><div><span onclick="r(\'apow\')" class="scifunc"><sup>y</sup>&#8730;x</span><span onclick="r(\'3x\')" class="scifunc"><sup>3</sup>&#8730;x</span><span onclick="r(\'sqrt\')" class="scifunc">&#8730;x</span><span onclick="r(\'ln\')" class="scifunc">ln</span><span onclick="r(\'log\')" class="scifunc">log</span></div><div><span onclick="r(\'(\')" class="scifunc">(</span><span onclick="r(\')\')" class="scifunc">)</span><span onclick="r(\'1/x\')" class="scifunc">1/x</span><span onclick="r(\'pc\')" class="scifunc">%</span><span onclick="r(\'n!\')" class="scifunc">n!</span></div></div></td>'), e += '<td><div style="padding-top:3px;"><div><span onclick="r(7)" class="scinm">7</span><span onclick="r(8)" class="scinm">8</span><span onclick="r(9)" class="scinm">9</span><span onclick="r(\'+\')" class="sciop">+</span><span onclick="r(\'bk\')" class="sciop">Back</span></div><div><span onclick="r(4)" class="scinm">4</span><span onclick="r(5)" class="scinm">5</span><span onclick="r(6)" class="scinm">6</span><span onclick="r(\'-\')" class="sciop">&ndash;</span><span onclick="r(\'M+\')" class="sciop">M+</span></div><div><span onclick="r(1)" class="scinm">1</span><span onclick="r(2)" class="scinm">2</span><span onclick="r(3)" class="scinm">3</span><span onclick="r(\'*\')" class="sciop">&#215;</span><span onclick="r(\'M-\')" class="sciop">M-</span></div><div><span onclick="r(0)" class="scinm">0</span><span onclick="r(\'.\')" class="scinm">.</span><span onclick="r(\'EXP\')" class="sciop">EXP</span><span onclick="r(\'/\')" class="sciop">/</span><span onclick="r(\'MR\')" class="sciop" id="scimrc">MR</span></div><div><span onclick="r(\'+/-\')" class="sciop">&#177;</span><span onclick="r(\'RND\')" class="sciop">RND</span><span onclick="r(\'C\')" class="scieq">AC</span><span onclick="r(\'=\')" class="scieq">=</span><span onclick="r(\'ans\')" class="sciop" style="color:#f00;">Use</span></div></div></td></tr></table>', document.getElementById("unquickcalc").innerHTML = e, document.getElementById("unquickcalc").style.display = "block", uqcStatus = 1, cnCInputs = [0], cnNew = !0, cnScreenV = 0) : (document.getElementById("unquickcalc").style.display = "none", uqcStatus = 0))
}