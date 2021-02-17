using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Fade : MonoBehaviour
{
    private Image img;
    public bool isFading = false;
    public float fadingSpeed = 1;
    // Start is called before the first frame update
    void Start()
    {
        img = GetComponent<Image>();
        var tempCol = img.color;
        tempCol.a = 0f;
        img.color = tempCol;
    }

    void Update() {
        if (isFading) {
            var tempCol = img.color;
            tempCol.a = tempCol.a + fadingSpeed * Time.deltaTime;
            img.color = tempCol;
            if (img.color.a >= 1) {
                isFading = false;
            }
        }
    }
}
